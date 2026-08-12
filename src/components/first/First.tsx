"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Typography } from "@/components/ui/Typography";
import { FirstFaq } from "./FirstFaq";
import { FirstFlow } from "./FirstFlow";
import { FirstOffer } from "./FirstOffer";
import { FirstDirector } from "./FirstDirector";
import { FirstClinic } from "./FirstClinic";
import { FirstCta } from "./FirstCta";
import styles from "./first.module.css";

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
 * 初めての方へ：Top / Menu / Q&A と同系のトーン・コンポーネント
 */
export function First() {
  const pageRef = useRef<HTMLElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    if (reducedMotion) {
      targets.forEach((el) => el.classList.add(styles.revealed));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <>
      <SiteHeader visible solid />

      <main
        id="first"
        ref={pageRef}
        className={styles.page}
        aria-label="初めての方へ"
      >
        <section className={styles.hero} aria-labelledby="first-heading">
          <div className={`${styles.heroCopy} ${styles.reveal}`}>
            <Typography variant="enLabel" as="p" className={styles.eyebrow}>
              FIRST VISIT
            </Typography>
            <Typography
              variant="pageTitle"
              as="h1"
              id="first-heading"
              className={styles.title}
            >
              初めての方へ
            </Typography>
            <span className={styles.heroRule} aria-hidden="true" />
            <Typography variant="lead" className={styles.lead}>
              Luneに<br className={styles.brSp} />ご興味を持っていただき<br className={styles.brSp} />ありがとうございます。
            </Typography>
            <Typography variant="body" className={styles.body}>
              初めての方にも安心して<br className={styles.brSp} />ご来院いただけるよう<br className={styles.brSp} />施術の流れや院内をご紹介します。
            </Typography>
          </div>
        </section>

        <FirstFlow />
        <FirstOffer />
        <FirstDirector />
        <FirstClinic />
        <FirstFaq />
        <FirstCta />
      </main>

      <SiteFooter />
    </>
  );
}
