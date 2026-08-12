import { Top } from "@/components/top/Top";
import { getLatestNews } from "@/lib/instagram-feed";

export const revalidate = 3600;

export default async function TopRoutePage() {
  const newsPosts = await getLatestNews(6);
  return <Top newsPosts={newsPosts} />;
}
