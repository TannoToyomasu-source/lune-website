"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/ArrowRight";
import styles from "./first-visit.module.css";

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
 * TOP：メニュー直後の「初めての方へ」導線
 * メニューで迷った視線を、上品にこちらへ誘導する
 */
export function FirstVisitSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reducedMotion) {
      root.classList.add(styles.inView);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          root.classList.add(styles.inView);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-label="初めての方へ"
    >
      <div className={styles.wash} aria-hidden="true" />

      <div
        className={styles.scrollCue}
        aria-hidden="true"
      />

      <p className={`${styles.invite} ${styles.reveal} ${styles.delay1}`}>
        メニュー選びに迷ったら、まずこちらから。
      </p>

      <SectionHeading
        className={`${styles.header} ${styles.reveal} ${styles.delay2}`}
        eyebrow="FIRST VISIT"
        title="初めての方へ"
      />

      <div className={styles.layout}>
        <div className={styles.copy}>
          <Typography
            variant="heading"
            as="h3"
            className={`${styles.title} ${styles.reveal} ${styles.delay4}`}
          >
            初めての方にも、
            <br />
            安心して通っていただくために。
          </Typography>
          <Typography
            variant="body"
            className={`${styles.body} ${styles.reveal} ${styles.delay5}`}
          >
            カウンセリングでお身体の状態やご希望を丁寧に伺い、
            <br />
            その日に合わせた施術をご提案します。
            <br />
            初めての方にもわかりやすく、安心してお通いいただけるよう整えています。
          </Typography>
          <Link
            href="/first"
            className={`${styles.cta} ${styles.reveal} ${styles.delay6}`}
          >
            初めての方はこちら
            <ArrowRight className={styles.ctaArrow} />
          </Link>
        </div>

        <div className={styles.visual}>
          <svg
            className={styles.gazePath}
            viewBox="0 0 420 360"
            fill="none"
            aria-hidden="true"
          >
            <path
              className={styles.gazeStroke}
              d="M36 48 C 120 40, 210 70, 250 140 S 310 260, 360 300"
            />
          </svg>

          <div className={styles.mediaStack}>
            <img
              src="/treatment_10.png"
              alt=""
              width={900}
              height={700}
              decoding="async"
              className={`${styles.photo} ${styles.photoBack} ${styles.revealPhotoBack}`}
            />
            <img
              src="/treatment_8.png"
              alt=""
              width={800}
              height={1000}
              decoding="async"
              className={`${styles.photo} ${styles.photoFront} ${styles.revealPhotoFront}`}
            />
          </div>

          <div
            className={`${styles.badge} ${styles.revealBadge}`}
            aria-hidden="true"
          >
            <p className={styles.badgeTitle}>
              初回限定プランの
              <br />
              ご案内
            </p>
            <span className={styles.badgeRule} />
            <p className={styles.badgeNote}>
              詳しくは「初めての方へ」
              <br />
              ページをご覧ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
