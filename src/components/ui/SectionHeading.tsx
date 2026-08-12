import type { ReactNode } from "react";
import { Typography } from "@/components/ui/Typography";
import styles from "./section-heading.module.css";

type SectionHeadingProps = {
  /** 英語ラベル（例: MENU / REASONS） */
  eyebrow: string;
  /** 日本語タイトル */
  title: ReactNode;
  /** タイトル下のリード（任意） */
  lead?: ReactNode;
  className?: string;
  titleAs?: "h2" | "h3";
};

/**
 * セクション共通見出し
 * 英語ラベル → 日本語タイトル → 金色の細い線（丸なし）
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = "",
  titleAs = "h2",
}: SectionHeadingProps) {
  return (
    <header className={[styles.root, className].filter(Boolean).join(" ")}>
      <Typography variant="enLabel" as="p" className={styles.eyebrow}>
        {eyebrow}
      </Typography>
      <Typography variant="sectionTitle" as={titleAs} className={styles.title}>
        {title}
      </Typography>
      <span className={styles.rule} aria-hidden="true" />
      {lead ? (
        <Typography variant="lead" className={styles.lead}>
          {lead}
        </Typography>
      ) : null}
    </header>
  );
}
