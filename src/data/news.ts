export const INSTAGRAM_PROFILE_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/";

export type NewsPost = {
  id: string;
  title: string;
  excerpt: string;
  /** 本文（詳細ページ）。段落は配列 */
  body: readonly string[];
  /** 画像（先頭がサムネイル。複数でカルーセル） */
  images: readonly string[];
  imageAlt: string;
  /** YYYY-MM-DD（ソート用） */
  date: string;
  dateLabel: string;
  /** Instagram 投稿 URL（外部リンク用） */
  permalink?: string;
};

/** フォールバック用（Behold 未設定時） */
export const NEWS_POSTS: NewsPost[] = [
  {
    id: "2026-08-business-days",
    title: "8月の営業日のお知らせ",
    excerpt:
      "8月の営業日・休診日についてご案内します。ご予約の際はカレンダーをご確認のうえ、お申し込みください。",
    body: [
      "平素より Lune をご利用いただき、誠にありがとうございます。",
      "8月の営業日・休診日についてお知らせいたします。夏季休暇を挟みますので、ご予約をご希望の方はお早めにご連絡ください。",
    ],
    images: [],
    imageAlt: "8月の営業日のお知らせ",
    date: "2026-08-01",
    dateLabel: "2026.08.01",
  },
  {
    id: "2026-07-business-days",
    title: "7月の営業日",
    excerpt:
      "今月の営業日・休診日のお知らせです。ご予約の際はカレンダーをご確認ください。",
    body: [
      "7月の営業カレンダーをご案内します。",
      "定休日は不定休となっておりますので、最新の空き状況はご予約または LINE よりご確認ください。",
    ],
    images: [],
    imageAlt: "7月の営業日のお知らせ",
    date: "2026-07-01",
    dateLabel: "2026.07.01",
  },
  {
    id: "2026-06-summer-care",
    title: "夏のセルフケア",
    excerpt:
      "暑さでゆらぎやすい時期の、姿勢と骨盤まわりのホームケアポイントをご紹介します。",
    body: [
      "気温や湿度の変化で、身体のコンディションもゆらぎやすい季節です。",
      "ご自身のペースで続けられるセルフケアを、施術の際にもお伝えしています。",
    ],
    images: [],
    imageAlt: "夏のセルフケアのヒント",
    date: "2026-06-20",
    dateLabel: "2026.06.20",
  },
  {
    id: "2026-06-with-children",
    title: "子連れでのご来院",
    excerpt:
      "キッズスペースのご案内と、ベビーカーでお越しの方へのサポートについて。",
    body: [
      "当院では、お子さま連れでのご来院を歓迎しています。",
      "ベビーカーでお越しの方は、事前に LINE などでお声がけください。",
    ],
    images: [],
    imageAlt: "子連れ来院のご案内",
    date: "2026-06-08",
    dateLabel: "2026.06.08",
  },
  {
    id: "2026-05-first-visit",
    title: "初めての方へ",
    excerpt:
      "カウンセリングから施術までの流れなど、初めてのご来院で気になりやすいポイントをまとめました。",
    body: [
      "初めての方にも安心してご来院いただけるよう、カウンセリングでお身体の状態やご希望を丁寧にお伺いします。",
    ],
    images: [],
    imageAlt: "初めての方へのご案内",
    date: "2026-05-15",
    dateLabel: "2026.05.15",
  },
];

export function getNewsSorted(posts: NewsPost[] = NEWS_POSTS): NewsPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestNews(
  limit = 3,
  posts: NewsPost[] = NEWS_POSTS,
): NewsPost[] {
  return getNewsSorted(posts).slice(0, limit);
}

export function getNewsById(
  id: string,
  posts: NewsPost[] = NEWS_POSTS,
): NewsPost | undefined {
  return posts.find((post) => post.id === id);
}

export function getNewsPage(
  page: number,
  perPage = 4,
  posts: NewsPost[] = NEWS_POSTS,
) {
  const sorted = getNewsSorted(posts);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: sorted.slice(start, start + perPage),
    page: current,
    totalPages,
    total,
  };
}
