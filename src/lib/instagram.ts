import type { NewsPost } from "@/data/news";
import { getLatestNews, INSTAGRAM_PROFILE_URL } from "@/data/news";

const GRAPH_VERSION = "v21.0";

type InstagramMediaItem = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

type InstagramMediaResponse = {
  data?: InstagramMediaItem[];
  error?: { message?: string; type?: string; code?: number };
};

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

function captionToTitle(caption?: string) {
  if (!caption?.trim()) return "Instagram";
  const firstLine = caption.trim().split(/\n/)[0] ?? "Instagram";
  return firstLine.length > 28 ? `${firstLine.slice(0, 28)}…` : firstLine;
}

function captionToExcerpt(caption?: string) {
  if (!caption?.trim()) return "Instagramの投稿を見る";
  const text = caption.trim().replace(/\s+/g, " ");
  return text.length > 90 ? `${text.slice(0, 90)}…` : text;
}

function toNewsPost(item: InstagramMediaItem): NewsPost {
  const image =
    item.media_type === "VIDEO"
      ? item.thumbnail_url ?? item.media_url
      : item.media_url ?? item.thumbnail_url;
  const caption = item.caption?.trim() ?? "";

  return {
    id: item.id,
    title: captionToTitle(item.caption),
    excerpt: captionToExcerpt(item.caption),
    body: caption
      ? caption
          .split(/\n+/)
          .map((p) => p.trim())
          .filter(Boolean)
      : ["Instagramの投稿をご覧ください。"],
    images: image ? [image] : [],
    imageAlt: captionToTitle(item.caption),
    date: formatDateKey(item.timestamp),
    dateLabel: formatDateLabel(item.timestamp),
  };
}

/**
 * Instagram Graph API から最新投稿を取得（任意・試験用）。
 * 失敗時はローカル最新記事を返す。
 */
export async function getInstagramPosts(limit = 3): Promise<NewsPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!token) {
    return getLatestNews(limit);
  }

  const userId = process.env.INSTAGRAM_USER_ID?.trim();
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");

  const urls: string[] = [];

  if (userId) {
    urls.push(
      `https://graph.facebook.com/${GRAPH_VERSION}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`,
    );
  }

  urls.push(
    `https://graph.instagram.com/${GRAPH_VERSION}/me/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`,
  );

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 3600 },
      });
      const json = (await res.json()) as InstagramMediaResponse;

      if (!res.ok || json.error || !json.data?.length) {
        console.warn("[instagram]", json.error?.message ?? res.statusText);
        continue;
      }

      return json.data.map(toNewsPost);
    } catch (error) {
      console.warn("[instagram] fetch failed", error);
    }
  }

  return getLatestNews(limit);
}

export function getInstagramProfileUrl() {
  return (
    process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || INSTAGRAM_PROFILE_URL
  );
}
