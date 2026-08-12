"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Typography } from "@/components/ui/Typography";
import {
  PRIVACY_CONTACT,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
} from "@/data/privacy";
import styles from "./privacy.module.css";

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
 * プライバシーポリシー
 */
export function PrivacyPage() {
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
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <>
      <SiteHeader visible solid />

      <main
        id="privacy"
        ref={pageRef}
        className={styles.page}
        aria-label="プライバシーポリシー"
      >
        <section className={styles.hero} aria-labelledby="privacy-heading">
          <div className={`${styles.heroCopy} ${styles.reveal}`}>
            <Typography variant="enLabel" as="p" className={styles.eyebrow}>
              PRIVACY POLICY
            </Typography>
            <Typography
              variant="pageTitle"
              as="h1"
              id="privacy-heading"
              className={styles.title}
            >
              プライバシーポリシー
            </Typography>
            <span className={styles.heroRule} aria-hidden="true" />
            <Typography variant="lead" className={styles.lead}>
              {PRIVACY_INTRO}
            </Typography>
          </div>
        </section>

        <section className={styles.body} aria-label="ポリシー本文">
          <div className={styles.inner}>
            {PRIVACY_SECTIONS.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className={`${styles.block} ${styles.reveal}`}
              >
                <Typography
                  variant="subheading"
                  as="h2"
                  className={styles.blockTitle}
                >
                  {section.title}
                </Typography>
                {section.paragraphs?.map((text) => (
                  <Typography
                    key={text}
                    variant="small"
                    className={styles.paragraph}
                  >
                    {text}
                  </Typography>
                ))}
                {section.bullets ? (
                  <ul className={styles.list}>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}

            <article
              id="contact"
              className={`${styles.block} ${styles.contact} ${styles.reveal}`}
            >
              <Typography
                variant="subheading"
                as="h2"
                className={styles.blockTitle}
              >
                {PRIVACY_CONTACT.title}
              </Typography>
              <Typography variant="small" className={styles.paragraph}>
                {PRIVACY_CONTACT.lead}
              </Typography>
              <address className={styles.address}>
                <Typography variant="heading" as="p" className={styles.clinicName}>
                  {PRIVACY_CONTACT.name}
                </Typography>
                <Typography variant="small" as="p" className={styles.addressLine}>
                  {PRIVACY_CONTACT.postalCode}
                </Typography>
                <Typography variant="small" as="p" className={styles.addressLine}>
                  {PRIVACY_CONTACT.address}
                </Typography>
                <Typography variant="small" as="p" className={styles.addressLine}>
                  TEL：
                  <a
                    href={`tel:${PRIVACY_CONTACT.phoneTel}`}
                    className={styles.link}
                  >
                    {PRIVACY_CONTACT.phoneDisplay}
                  </a>
                </Typography>
                <Typography variant="small" as="p" className={styles.addressLine}>
                  {PRIVACY_CONTACT.hours}
                </Typography>
                <Typography variant="small" as="p" className={styles.addressLine}>
                  {PRIVACY_CONTACT.lineLabel}：
                  <a
                    href={PRIVACY_CONTACT.lineUrl}
                    className={styles.link}
                    target={
                      PRIVACY_CONTACT.lineUrl.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      PRIVACY_CONTACT.lineUrl.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {PRIVACY_CONTACT.lineUrl.startsWith("http")
                      ? PRIVACY_CONTACT.lineUrl
                      : "［LINE URLを記載］"}
                  </a>
                </Typography>
              </address>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
