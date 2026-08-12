import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDetailPage } from "@/components/news/NewsDetailPage";
import { getAllNewsPosts, getNewsById } from "@/lib/instagram-feed";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllNewsPosts();
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getNewsById(id);
  if (!post) return { title: "News" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsDetailRoutePage({ params }: PageProps) {
  const { id } = await params;
  const post = await getNewsById(id);
  if (!post) notFound();
  return <NewsDetailPage post={post} />;
}
