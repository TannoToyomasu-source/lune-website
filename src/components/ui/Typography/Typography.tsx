import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";
import styles from "./Typography.module.css";

/**
 * Typography variants
 *
 * | variant       | 使用場所 |
 * |---------------|----------|
 * | display       | TOPのメインコピーのみ |
 * | pageTitle     | 初めての方へ、Q&A、News、Privacy Policy |
 * | sectionTitle  | Concept、施術の流れ、院内紹介、News |
 * | heading       | 記事タイトル、FAQ内の見出し、料金見出し |
 * | subheading    | 小さなセクション内見出し |
 * | lead          | コンセプトなどの短く印象的な文章 |
 * | body          | 通常本文、Q&A回答、プロフィール本文 |
 * | small         | 補足説明、料金説明、資格、経歴 |
 * | caption       | 日付、注釈、営業時間 |
 * | label         | ナビ、ボタン、小さな日本語ラベル |
 * | enLabel       | Concept、News、First Visit などの英語 |
 */
export type TypographyVariant =
  | "display"
  | "pageTitle"
  | "sectionTitle"
  | "heading"
  | "subheading"
  | "lead"
  | "body"
  | "small"
  | "caption"
  | "label"
  | "enLabel";

const defaultElements: Record<TypographyVariant, ElementType> = {
  display: "h1",
  pageTitle: "h1",
  sectionTitle: "h2",
  heading: "h3",
  subheading: "h4",
  lead: "p",
  body: "p",
  small: "p",
  caption: "span",
  label: "span",
  enLabel: "span",
};

type TypographyProps<T extends ElementType = "p"> = {
  as?: T;
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Typography<T extends ElementType = "p">({
  as,
  variant,
  children,
  className = "",
  ...props
}: TypographyProps<T>) {
  const Component = (as ?? defaultElements[variant]) as ElementType;

  return (
    <Component
      className={[styles.base, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
