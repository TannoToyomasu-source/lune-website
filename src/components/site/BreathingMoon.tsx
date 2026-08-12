import type { CSSProperties } from "react";
import styles from "./breathing-moon.module.css";

/**
 * ページごとの光の当たり位置。
 * TOP のスクロールで --light-x が左右に動く印象に近い固定値。
 * （欠けマスクは使わない）
 */
export type BreathingMoonPhase = "full" | "crescent" | "quarter" | "gibbous";

const LIGHT_BY_PHASE: Record<
  BreathingMoonPhase,
  { x: string; y: string }
> = {
  /** TOP 中盤付近 */
  full: { x: "48%", y: "44%" },
  /** 初めての方へ：右寄り（TOP 後半の光に近い） */
  gibbous: { x: "60%", y: "44%" },
  /** 中間 */
  quarter: { x: "50%", y: "44%" },
  /** Q&A：左寄り（TOP 序盤よりさらに寄せて三日月っぽい当たり） */
  crescent: { x: "26%", y: "44%" },
};

type BreathingMoonProps = {
  phase?: BreathingMoonPhase;
  className?: string;
  reducedMotion?: boolean;
};

/**
 * TOP と同じミントの呼吸する月光。
 * ページ差は光の当たり位置（左右）だけ。
 */
export function BreathingMoon({
  phase = "full",
  className = "",
  reducedMotion = false,
}: BreathingMoonProps) {
  const light = LIGHT_BY_PHASE[phase];

  return (
    <div
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      style={
        {
          "--light-x": light.x,
          "--light-y": light.y,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div
        className={[
          styles.orb,
          reducedMotion ? styles.still : styles.breathe,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className={styles.lit} />
      </div>
    </div>
  );
}
