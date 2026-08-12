"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Typography } from "@/components/ui/Typography";
import { FirstCta } from "@/components/first/FirstCta";
import { MENU_ITEMS, type MenuItem } from "@/data/menus";
import styles from "./menu-detail.module.css";

type MenuDetailPageProps = {
  item: MenuItem;
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * メニュー特設ページ（Top とトーン・動きを揃えたレイアウト）
 */
export function MenuDetailPage({ item }: MenuDetailPageProps) {
  const pageRef = useRef<HTMLElement>(null);
  const others = MENU_ITEMS.filter((m) => m.slug !== item.slug);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    if (reducedMotion) {
      page.querySelectorAll(`.${styles.reveal}`).forEach((el) => {
        el.classList.add(styles.revealed);
      });
      return;
    }

    const targets = page.querySelectorAll(`.${styles.reveal}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion, item.slug]);

  return (
    <>
      <SiteHeader visible solid />

      <main
        ref={pageRef}
        className={styles.page}
        aria-label={item.title}
      >
        <section className={styles.hero}>
          <div className={`${styles.heroCopy} ${styles.reveal}`}>
            <Typography variant="enLabel" as="p" className={styles.eyebrow}>
              {item.enLabel}
            </Typography>
            <Typography variant="pageTitle" className={styles.title}>
              {item.title}
            </Typography>
            <Typography variant="small" as="p" className={styles.price}>
              {item.price}
            </Typography>
            <Typography variant="lead" className={styles.lead}>
              {item.lead}
            </Typography>
            <div className={styles.cta}>
              <ReservationButton variant="mint" showHours />
            </div>
          </div>

          <div className={`${styles.heroMedia} ${styles.reveal} ${styles.delay2}`}>
            <img
              src={item.image}
              alt={item.imageAlt}
              width={1200}
              height={900}
              decoding="async"
              className={styles.heroImage}
            />
          </div>
        </section>

        <section className={styles.courses} aria-labelledby="course-heading">
          <SectionHeading
            className={`${styles.coursesHeading} ${styles.reveal}`}
            eyebrow="COURSE"
            title={<span id="course-heading">コース一覧</span>}
          />

          <ul className={styles.courseList}>
            {item.courses.map((course, index) => (
              <li
                key={course.name}
                className={`${styles.courseCard} ${styles.reveal} ${styles[`delay${Math.min(index + 2, 4)}`] ?? ""}`}
              >
                <div className={styles.courseMedia}>
                  <img
                    src={course.image ?? item.image}
                    alt=""
                    width={480}
                    height={360}
                    decoding="async"
                    className={styles.courseImage}
                  />
                </div>

                <div className={styles.courseMain}>
                  <Typography
                    variant="heading"
                    as="h3"
                    className={styles.courseName}
                  >
                    {course.name}
                  </Typography>
                  <Typography variant="body" className={styles.courseSummary}>
                    {course.summary}
                  </Typography>

                  <div className={styles.courseBody}>
                    <div className={styles.courseCol}>
                      <p className={styles.colLabel}>施術内容</p>
                      <ul className={styles.bulletList}>
                        {course.contents.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.courseCol}>
                      <p className={styles.colLabel}>こんな方におすすめ</p>
                      <ul className={styles.bulletList}>
                        {course.recommended.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <aside className={styles.coursePricing} aria-label="時間・料金">
                  <Typography
                    variant="caption"
                    as="p"
                    className={styles.pricingLabel}
                  >
                    時間・料金
                  </Typography>
                  <p className={styles.pricingDuration}>
                    <Typography
                      variant="small"
                      as="span"
                      className={styles.pricingAffix}
                    >
                      約
                    </Typography>
                    <Typography
                      variant="heading"
                      as="span"
                      className={styles.pricingValue}
                    >
                      {course.duration.replace(/分$/, "")}
                    </Typography>
                    <Typography
                      variant="small"
                      as="span"
                      className={styles.pricingAffix}
                    >
                      分
                    </Typography>
                  </p>
                  <p className={styles.pricingPrice}>
                    <Typography
                      variant="heading"
                      as="span"
                      className={styles.pricingValue}
                    >
                      {course.price.replace(/円$/, "")}
                    </Typography>
                    <Typography
                      variant="small"
                      as="span"
                      className={styles.pricingAffix}
                    >
                      円
                    </Typography>
                    <Typography
                      variant="caption"
                      as="span"
                      className={styles.pricingTax}
                    >
                      （税込）
                    </Typography>
                  </p>
                  {course.pricingNote ? (
                    <Typography
                      variant="caption"
                      as="p"
                      className={styles.pricingNote}
                    >
                      {course.pricingNote}
                    </Typography>
                  ) : null}
                </aside>
              </li>
            ))}
          </ul>
          <div className={styles.courseNotes}>
            <p className={styles.courseNote}>
              ※ 回数券のご用意がございます。<span className={styles.courseNoteRest}>気になる方はカウンセリングにてご相談ください。</span>
            </p>
            <p className={styles.courseNote}>
              ※ 訪問での施術も承っております。<span className={styles.courseNoteRest}>ご希望の方は、お気軽にご相談ください。</span>
            </p>
          </div>
        </section>

        <nav className={styles.related} aria-label="その他のメニューはこちら">
          <p className={styles.relatedLabel}>その他のメニューはこちら</p>
          <ul className={styles.relatedList}>
            {others.map((menu) => (
              <li key={menu.slug}>
                <Link href={`/menu/${menu.slug}`} className={styles.relatedLink}>
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <FirstCta />
      </main>

      <SiteFooter />
    </>
  );
}
