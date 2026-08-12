"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { RESERVATION_OPTIONS } from "@/lib/reservation";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { Button } from "@/components/ui/Button";
import { ReceptionHours } from "@/components/ui/ReceptionHours";
import styles from "./reservation-button.module.css";

type Variant = "outline" | "filled" | "mint" | "header" | "headerFill";

type ReservationButtonProps = {
  children?: ReactNode;
  className?: string;
  variant?: Variant;
  /** 受付時間・定休日をボタン下に表示（header では常に非表示） */
  showHours?: boolean;
  "aria-label"?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "type"
>;

function linkAttrs(href: string) {
  const external = href.startsWith("http");
  return {
    href,
    target: external ? "_blank" : undefined,
    rel: external ? "noopener noreferrer" : undefined,
  };
}

/**
 * 相談・予約ボタン。ホバー（またはタップ）で LINE相談 / 予約 を選べる。
 */
export function ReservationButton({
  children = "相談・予約はこちら",
  className = "",
  variant = "outline",
  showHours,
  "aria-label": ariaLabel,
  ...rest
}: ReservationButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const isHeader = variant === "header" || variant === "headerFill";
  const displayHours = !isHeader && showHours !== false;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const variantClass =
    variant === "mint"
      ? styles.mint
      : variant === "filled"
        ? styles.filled
        : variant === "headerFill"
          ? `${styles.header} ${styles.headerFill}`
          : variant === "header"
            ? styles.header
            : styles.outline;

  return (
    <div
      ref={rootRef}
      className={[
        styles.wrap,
        open ? styles.open : "",
        displayHours ? styles.withHours : "",
        isHeader ? styles.headerWrap : "",
        styles[`tone_${isHeader ? "header" : variant}`],
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={styles.trigger}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          type="button"
          className={[styles.button, variantClass, className]
            .filter(Boolean)
            .join(" ")}
          aria-label={
            ariaLabel ??
            (typeof children === "string" ? children : "相談・予約はこちら")
          }
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          onFocus={() => setOpen(true)}
          {...rest}
        >
          <span className={styles.label}>{children}</span>
          {isHeader ? null : <ArrowRight className={styles.arrow} />}
        </button>

        <div
          id={menuId}
          className={styles.menu}
          role="menu"
          aria-label="相談・予約の方法を選ぶ"
          aria-hidden={!open}
        >
          {RESERVATION_OPTIONS.map((option) =>
            option.primary ? (
              <a
                key={option.id}
                className={styles.menuPrimary}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                {...linkAttrs(option.href)}
              >
                <span className={styles.label}>{option.label}</span>
              </a>
            ) : (
              <Button
                key={option.id}
                variant="text"
                className={styles.menuItem}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                {...linkAttrs(option.href)}
              >
                {option.label}
              </Button>
            ),
          )}
        </div>
      </div>

      {displayHours ? <ReceptionHours /> : null}
    </div>
  );
}
