import type { NewsPost } from "@/data/news";
import {
  NEWS_POSTS,
  getLatestNews as getLocalLatest,
  getNewsById as getLocalById,
  getNewsPage as getLocalPage,
  getNewsSorted as getLocalSorted,
  INSTAGRAM_PROFILE_URL,
} from "@/data/news";

type BeholdChild = {
  id?: string;
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  sizes?: {
    medium?: { mediaUrl?: string };
    large?: { mediaUrl?: string };
  };
};

type BeholdPost = {
  id: string;
  permalink?: string;
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  timestamp?: string;
  children?: BeholdChild[];
  sizes?: {
    medium?: { mediaUrl?: string };
    large?: { mediaUrl?: string };
    full?: { mediaUrl?: string };
  };
};

function getFeedUrl() {
  const direct = process.env.BEHOLD_FEED_URL?.trim();
  if (direct) return direct;
  const id = process.env.BEHOLD_FEED_ID?.trim();
  if (id) return `https://feeds.behold.so/${id}`;
  return null;
}

function formatDateLabel(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function formatDateKey(iso?: string) {
  if (!iso) return "1970-01-01";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "1970-01-01";
  return d.toISOString().slice(0, 10);
}

/** キャプションを行に分割（空行・「.」のみは除外） */
function captionLines(caption?: string) {
  if (!caption?.trim()) return [] as string[];
  return caption
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line !== ".");
}

/** 1行目＝タイトル */
function captionToTitle(caption?: string) {
  const lines = captionLines(caption);
  if (!lines.length) return "お知らせ";
  const first = lines[0] ?? "お知らせ";
  return first.length > 36 ? `${first.slice(0, 36)}…` : first;
}

/** 2行目以降＝一覧用抜粋 */
function captionToExcerpt(caption?: string) {
  const lines = captionLines(caption);
  if (lines.length < 2) return "";
  const text = lines.slice(1).join(" ");
  return text.length > 100 ? `${text.slice(0, 100)}…` : text;
}

/** 2行目以降＝詳細本文 */
function captionToBody(caption?: string) {
  const lines = captionLines(caption);
  if (lines.length < 2) return [] as string[];
  return lines.slice(1);
}

function pickImage(post: BeholdPost | BeholdChild) {
  return (
    post.sizes?.large?.mediaUrl ||
    post.sizes?.medium?.mediaUrl ||
    post.sizes?.full?.mediaUrl ||
    (post.mediaType === "VIDEO" ? post.thumbnailUrl : undefined) ||
    post.mediaUrl ||
    post.thumbnailUrl
  );
}

function toNewsPost(post: BeholdPost): NewsPost {
  const rawCaption = post.caption?.trim() || post.prunedCaption?.trim() || "";
  const images: string[] = [];

  // カルーセルは子画像のみ（親の代表画像と重複しないように）
  if (post.children?.length) {
    for (const child of post.children) {
      const url = pickImage(child);
      if (url && !images.includes(url)) images.push(url);
    }
  }

  if (!images.length) {
    const main = pickImage(post);
    if (main) images.push(main);
  }

  const title = captionToTitle(rawCaption);

  return {
    id: post.id,
    title,
    excerpt: captionToExcerpt(rawCaption),
    body: captionToBody(rawCaption),
    images,
    imageAlt: title,
    date: formatDateKey(post.timestamp),
    dateLabel: formatDateLabel(post.timestamp),
    permalink: post.permalink,
  };
}

/**
 * Behold JSON フィードから Instagram 投稿を取得（埋め込み連携・推奨）。
 * Meta 開発者登録不要。https://behold.so でフィード作成 → URL/ID を env に設定。
 */
export async function fetchInstagramPosts(): Promise<NewsPost[]> {
  const feedUrl = getFeedUrl();
  if (!feedUrl) return NEWS_POSTS;

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.warn("[behold] feed error", res.status, res.statusText);
      return [];
    }

    const data: unknown = await res.json();
    const items: BeholdPost[] = Array.isArray(data)
      ? data
      : Array.isArray((data as { posts?: BeholdPost[] })?.posts)
        ? ((data as { posts: BeholdPost[] }).posts ?? [])
        : [];

    return items.map(toNewsPost);
  } catch (error) {
    console.warn("[behold] fetch failed", error);
    return [];
  }
}

export async function getAllNewsPosts(): Promise<NewsPost[]> {
  return getLocalSorted(await fetchInstagramPosts());
}

export async function getLatestNews(limit = 3): Promise<NewsPost[]> {
  return getLocalLatest(limit, await fetchInstagramPosts());
}

export async function getNewsById(id: string): Promise<NewsPost | undefined> {
  return getLocalById(id, await fetchInstagramPosts());
}

export async function getNewsPage(page: number, perPage = 4) {
  return getLocalPage(page, perPage, await fetchInstagramPosts());
}

export function getInstagramProfileUrl() {
  return (
    process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || INSTAGRAM_PROFILE_URL
  );
}

export function isInstagramFeedConfigured() {
  return Boolean(getFeedUrl());
}
