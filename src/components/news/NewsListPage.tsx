import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsCta } from "@/components/news/NewsCta";
import { NewsListCard } from "@/components/news/NewsListCard";
import type { NewsPost } from "@/data/news";
import styles from "./news-page.module.css";

type NewsListPageProps = {
  posts: NewsPost[];
};

/**
 * News 一覧（全件を1ページで表示）
 */
export function NewsListPage({ posts }: NewsListPageProps) {
  return (
    <>
      <SiteHeader visible solid />
      <main className={styles.page} aria-label="News">
        <div className={styles.inner}>
          <SectionHeading
            className={styles.header}
            eyebrow="NEWS"
            title="お知らせ"
            lead="Luneからのお知らせをお届けします。"
          />

          {posts.length === 0 ? (
            <div
              className={styles.comingSoonFrame}
              role="status"
              aria-label="お知らせ準備中"
            >
              <span className={styles.comingSoon}>Coming Soon</span>
            </div>
          ) : (
            <ul className={styles.list}>
              {posts.map((post) => (
                <li key={post.id}>
                  <NewsListCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <NewsCta />
      </main>
      <SiteFooter />
    </>
  );
}
