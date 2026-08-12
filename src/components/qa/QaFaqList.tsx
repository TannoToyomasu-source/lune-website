"use client";

import { useMemo, useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Typography } from "@/components/ui/Typography";
import {
  QA_FAQ_CATEGORIES,
  QA_FAQ_ITEMS,
  type QaFaqCategoryOption,
} from "@/data/qaFaq";
import styles from "./qa.module.css";

/**
 * カテゴリ絞り込み付き FAQ。
 * Accordion は mode="multiple"（同時に複数開ける）。
 */
export function QaFaqList() {
  const [active, setActive] =
    useState<QaFaqCategoryOption["id"]>("all");

  const items = useMemo(() => {
    if (active === "all") return QA_FAQ_ITEMS;
    return QA_FAQ_ITEMS.filter((item) => item.category === active);
  }, [active]);

  return (
    <div className={styles.faqPanel}>
      <div
        className={styles.categoryBar}
        role="tablist"
        aria-label="質問カテゴリ"
      >
        {QA_FAQ_CATEGORIES.map((cat) => {
          const selected = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={[
                styles.categoryTab,
                selected ? styles.categoryTabActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActive(cat.id)}
            >
              <Typography variant="label" as="span">
                {cat.label}
              </Typography>
            </button>
          );
        })}
      </div>

      <div className={styles.faqList} role="tabpanel">
        {items.length > 0 ? (
          <Accordion
            key={active}
            items={items}
            mode="multiple"
            defaultOpenIndex={null}
          />
        ) : (
          <Typography variant="body" className={styles.faqEmpty}>
            該当するご質問はありません。
          </Typography>
        )}
      </div>
    </div>
  );
}
