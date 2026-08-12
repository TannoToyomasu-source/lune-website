"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { ReceptionHours } from "@/components/ui/ReceptionHours";
import { Typography } from "@/components/ui/Typography";
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

export function FirstCta() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const target = root.querySelector(`.${styles.reveal}`);
    if (!target) return;

    if (reducedMotion) {
      target.classList.add(styles.revealed);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          target.classList.add(styles.revealed);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className={styles.cta} aria-label="ご予約">
      <div className={`${styles.ctaInner} ${styles.reveal}`}>
        <div className={styles.ctaMain}>
          <Typography variant="lead" className={styles.ctaLead}>
            まずは、
            <br />
            お気軽にご相談ください。
          </Typography>
          <Typography variant="body" className={styles.ctaBody}>
            LINEでのご相談、またはご予約からお選びいただけます。
          </Typography>
        </div>
        <div className={styles.ctaAction}>
          <ReservationButton variant="mint" showHours={false} />
          <ReceptionHours />
        </div>
      </div>
    </section>
  );
}
