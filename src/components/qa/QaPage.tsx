"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { ReceptionHours } from "@/components/ui/ReceptionHours";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Typography } from "@/components/ui/Typography";
import { CANCELLATION_POLICY } from "@/data/qaFaq";
import { QaFaqList } from "./QaFaqList";
import styles from "./qa.module.css";

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
 * Q&A：Top / メニュー詳細と同系のトーン・動き
 */
export function QaPage() {
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
        id="qa"
        ref={pageRef}
        className={styles.page}
        aria-label="Q&A"
      >
        <section className={styles.hero} aria-labelledby="qa-heading">
          <div className={`${styles.heroCopy} ${styles.reveal}`}>
            <Typography variant="enLabel" as="p" className={styles.eyebrow}>
              Q&A
            </Typography>
            <Typography
              variant="pageTitle"
              as="h1"
              id="qa-heading"
              className={styles.title}
            >
              よくあるご質問
            </Typography>
            <span className={styles.heroRule} aria-hidden="true" />
            <Typography variant="lead" className={styles.lead}>
              初めてご来院いただく方から
              <br />
              よく寄せられるご質問をまとめました。
            </Typography>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.faq}`}
          aria-labelledby="faq-list-heading"
        >
          <h2 id="faq-list-heading" className={styles.visuallyHidden}>
            よくあるご質問一覧
          </h2>
          <div className={`${styles.faqWrap} ${styles.reveal}`}>
            <QaFaqList />
          </div>
        </section>

        <section
          id="cancellation-policy"
          className={`${styles.section} ${styles.policy}`}
          aria-labelledby="policy-heading"
        >
          <div className={`${styles.policyInner} ${styles.reveal}`}>
            <SectionHeading
              className={styles.policyHeading}
              eyebrow="CANCELLATION"
              title={<span id="policy-heading">キャンセルポリシー</span>}
            />
            <div className={styles.policyBody}>
              {CANCELLATION_POLICY.paragraphs.map((text) => (
                <Typography variant="body" key={text}>
                  {text}
                </Typography>
              ))}
              {CANCELLATION_POLICY.feeAmount ? (
                <Typography variant="small" className={styles.policyFee}>
                  キャンセル料：{CANCELLATION_POLICY.feeAmount}
                </Typography>
              ) : null}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-label="予約・お問い合わせ">
          <div className={`${styles.ctaInner} ${styles.reveal}`}>
            <div className={styles.ctaMain}>
              <Typography variant="lead" className={styles.ctaLead}>
                そのほかに気になることがございましたら、
                <br />
                お気軽にご相談ください。
              </Typography>
            </div>
            <div className={styles.ctaAction}>
              <ReservationButton variant="mint" showHours={false} />
              <ReceptionHours />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
