import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { ArrowRight } from "@/components/ui/ArrowRight";
import type { NewsPost } from "@/data/news";
import styles from "./news-list-card.module.css";

type NewsListCardProps = {
  post: NewsPost;
};

/**
 * News 一覧用：横並びカード（画像 + テキスト + 矢印）
 */
export function NewsListCard({ post }: NewsListCardProps) {
  const thumb = post.images[0];

  return (
    <Link href={`/news/${post.id}`} className={styles.card}>
      <div className={styles.media}>
        {thumb ? (
          <img
            src={thumb}
            alt={post.imageAlt}
            width={400}
            height={400}
            decoding="async"
            className={styles.image}
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            画像
          </span>
        )}
      </div>
      <div className={styles.body}>
        <Typography variant="caption" as="p" className={styles.date}>
          {post.dateLabel}
        </Typography>
        <Typography variant="heading" as="h2" className={styles.title}>
          {post.title}
        </Typography>
        {post.excerpt ? (
          <Typography variant="small" className={styles.excerpt}>
            {post.excerpt}
          </Typography>
        ) : null}
      </div>
      <ArrowRight className={styles.arrow} />
    </Link>
  );
}
