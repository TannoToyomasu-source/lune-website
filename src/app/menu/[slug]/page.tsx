import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuDetailPage } from "@/components/menu/MenuDetailPage";
import { MENU_ITEMS, getMenuBySlug, isMenuSlug } from "@/data/menus";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MENU_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuBySlug(slug);
  if (!item) {
    return { title: "メニュー" };
  }
  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function MenuSlugPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isMenuSlug(slug)) {
    notFound();
  }
  const item = getMenuBySlug(slug);
  if (!item) {
    notFound();
  }
  return <MenuDetailPage item={item} />;
}
