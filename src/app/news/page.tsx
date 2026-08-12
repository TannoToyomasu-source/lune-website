import type { Metadata } from "next";
import { NewsListPage } from "@/components/news/NewsListPage";
import { getAllNewsPosts } from "@/lib/instagram-feed";

export const metadata: Metadata = {
  title: "News",
  description: "Luneからのお知らせをお届けします。",
};

export const revalidate = 3600;

export default async function NewsRoutePage() {
  const posts = await getAllNewsPosts();
  return <NewsListPage posts={posts} />;
}
