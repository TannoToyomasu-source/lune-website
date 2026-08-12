import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { NewsPost } from "@/data/news";
import styles from "./news-section.module.css";

type NewsSectionProps = {
  posts?: NewsPost[];
};

/**
 * TOP：お知らせを Instagram 風スクエアグリッドで表示（最大6件）
 */
export function NewsSection({ posts }: NewsSectionProps) {
  const items = (posts ?? []).slice(0, 6);

  return (
    <div id="news" className={styles.root}>
      <SectionHeading
        className={styles.header}
        eyebrow="NEWS"
        title="お知らせ"
        lead="サロンの最新情報をお届けします"
      />

      {items.length === 0 ? (
        <div
          className={styles.comingSoonFrame}
          role="status"
          aria-label="お知らせ準備中"
        >
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>
      ) : (
        <>
          <ul
            className={`${styles.grid}${items.length === 1 ? ` ${styles.gridSingle}` : ""}`}
          >
            {items.map((post) => {
              const thumb = post.images[0];
              return (
                <li key={post.id} className={styles.tile}>
                  <a
                    href={`/news/${post.id}`}
                    className={styles.tileLink}
                    aria-label={`${post.dateLabel} ${post.title}`}
                  >
                    {thumb ? (
                      <img
                        src={thumb}
                        alt=""
                        width={640}
                        height={640}
                        decoding="async"
                        className={styles.image}
                      />
                    ) : (
                      <span className={styles.imagePlaceholder} aria-hidden="true">
                        お知らせ
                      </span>
                    )}
                    <span className={styles.overlay}>
                      <span className={styles.overlayDate}>{post.dateLabel}</span>
                      <span className={styles.overlayTitle}>{post.title}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className={styles.more}>
            <Button variant="text" href="/news" className={styles.moreButton}>
              すべての記事を見る
              <ArrowRight className={styles.moreArrow} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
