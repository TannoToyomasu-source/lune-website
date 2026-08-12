"use client";

import { useId, useState } from "react";
import { Typography } from "@/components/ui/Typography";
import styles from "./accordion.module.css";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  /**
   * multiple: 複数同時に開ける（各行が独立）
   * single: 1件だけ開く（他を閉じる）
   */
  mode?: "multiple" | "single";
  /** 初期で開くインデックス。null ならすべて閉じる */
  defaultOpenIndex?: number | null;
  className?: string;
};

function AccordionRow({
  item,
  open,
  onToggle,
  index,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reactId = useId();
  const panelId = `${reactId}-panel-${index}`;
  const buttonId = `${reactId}-button-${index}`;

  return (
    <div className={[styles.item, open ? styles.itemOpen : ""].join(" ")}>
      <button
        type="button"
        id={buttonId}
        className={styles.question}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <Typography variant="body" as="span" className={styles.questionText}>
          <span className={styles.qMark} aria-hidden="true">
            Q.
          </span>
          {item.question}
        </Typography>
        <span className={styles.icon} aria-hidden="true">
          {open ? "−" : "＋"}
        </span>
      </button>
      <div
        id={panelId}
        className={styles.answer}
        role="region"
        aria-labelledby={buttonId}
      >
        <div className={styles.answerInner}>
          <Typography variant="body" as="p" className={styles.answerText}>
            <span className={styles.aMark} aria-hidden="true">
              A.
            </span>
            {item.answer}
          </Typography>
        </div>
      </div>
    </div>
  );
}

/**
 * 再利用可能な FAQ アコーディオン。
 * 既定は multiple（同時に複数開ける）。single にすると1件のみ。
 */
export function Accordion({
  items,
  mode = "multiple",
  defaultOpenIndex = 0,
  className = "",
}: AccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(() => {
    if (defaultOpenIndex == null || defaultOpenIndex < 0) return new Set();
    return new Set([defaultOpenIndex]);
  });

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(mode === "single" ? [] : prev);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={[styles.list, className].filter(Boolean).join(" ")}>
      {items.map((item, index) => (
        <AccordionRow
          key={item.question}
          item={item}
          index={index}
          open={openSet.has(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}
