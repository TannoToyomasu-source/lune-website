"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { NewsCta } from "@/components/news/NewsCta";
import type { NewsPost } from "@/data/news";
import styles from "./news-detail.module.css";

type NewsDetailPageProps = {
  post: NewsPost;
};

/**
 * News 詳細：画像（カルーセル）+ キャプション全文
 */
export function NewsDetailPage({ post }: NewsDetailPageProps) {
  const images = post.images;
  const [index, setIndex] = useState(0);
  const hasCarousel = images.length > 1;
  const current = images[index];

  useEffect(() => {
    setIndex(0);
  }, [post.id]);

  return (
    <>
      <SiteHeader visible solid />
      <main className={styles.page} aria-label={post.title}>
        <article className={styles.article}>
          <p className={styles.meta}>
            <Typography variant="caption" as="span" className={styles.date}>
              {post.dateLabel}
            </Typography>
            <Typography variant="pageTitle" as="h1" className={styles.title}>
              {post.title}
            </Typography>
          </p>

          <div className={styles.media}>
            {current ? (
              <img
                src={current}
                alt={`${post.imageAlt}${hasCarousel ? `（${index + 1}/${images.length}）` : ""}`}
                width={1200}
                height={1200}
                decoding="async"
                className={styles.image}
              />
            ) : (
              <span className={styles.placeholder} aria-hidden="true">
                画像
              </span>
            )}

            {hasCarousel ? (
              <>
                <button
                  type="button"
                  className={`${styles.navBtn} ${styles.navPrev}`}
                  onClick={() =>
                    setIndex((i) => (i - 1 + images.length) % images.length)
                  }
                  aria-label="前の画像"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles.navBtn} ${styles.navNext}`}
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  aria-label="次の画像"
                >
                  ›
                </button>
                <div className={styles.dots} aria-hidden="true">
                  {images.map((src, i) => (
                    <span
                      key={src}
                      className={i === index ? styles.dotActive : styles.dot}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>

          {post.body.length > 0 ? (
            <div className={styles.body}>
              {post.body.map((paragraph) => (
                <Typography variant="body" key={paragraph}>
                  {paragraph}
                </Typography>
              ))}
            </div>
          ) : null}

          {post.permalink ? (
            <div className={styles.instagramLink}>
              <Button
                variant="text"
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagramで開く
              </Button>
            </div>
          ) : null}

          <div className={styles.back}>
            <Link href="/news" className={styles.backLink}>
              ← News一覧へ戻る
            </Link>
          </div>
        </article>

        <NewsCta />
      </main>
      <SiteFooter />
    </>
  );
}
