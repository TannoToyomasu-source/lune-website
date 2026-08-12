import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import styles from "./button.module.css";

export type ButtonVariant = "fill" | "stroke" | "text";

type CommonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * 汎用ボタン
 * - fill: 塗り
 * - stroke: 金枠（ピル型）
 * - text: 文字のみ（ホバーで右から下線）
 */
export function Button({
  variant = "stroke",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <a href={href} className={classNames} {...anchorRest}>
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button type="button" className={classNames} {...buttonRest}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
