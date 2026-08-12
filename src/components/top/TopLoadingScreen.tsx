import { BreathingMoon } from "@/components/site/BreathingMoon";
import styles from "./top-loading.module.css";

type TopLoadingScreenProps = {
  /** visible → 表示中 / hiding → フェードアウト中 / done → 非表示 */
  phase: "visible" | "hiding" | "done";
  reducedMotion?: boolean;
};

/**
 * TOP 初回表示：ミントの月光で、動画準備までの間をやわらかく見せる
 */
export function TopLoadingScreen({
  phase,
  reducedMotion = false,
}: TopLoadingScreenProps) {
  if (phase === "done") return null;

  return (
    <div
      className={[
        styles.screen,
        phase === "hiding" ? styles.hiding : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={phase === "visible"}
      aria-label="読み込み中"
    >
      <div className={styles.inner}>
        <div className={styles.loader} aria-hidden="true">
          <BreathingMoon
            phase="full"
            reducedMotion={reducedMotion}
            className={styles.moon}
          />
          <span
            className={[
              styles.moonSpinner,
              reducedMotion ? styles.moonSpinnerStill : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </div>
      </div>
    </div>
  );
}
