import { BreathingMoon } from "@/components/site/BreathingMoon";
import styles from "./top-loading.module.css";

type TopLoadingScreenProps = {
  /** visible → 表示中 / hiding → フェードアウト中 / done → 非表示 */
  phase: "visible" | "hiding" | "done";
  reducedMotion?: boolean;
};

/**
 * TOP 初回表示：ミントの月光とロゴで、動画準備までの間をやわらかく見せる
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
        <BreathingMoon
          phase="full"
          reducedMotion={reducedMotion}
          className={styles.moon}
        />
        <img
          src="/brand/Logo.png"
          alt=""
          width={160}
          height={48}
          decoding="async"
          className={styles.logo}
        />
        <span className={styles.rule} aria-hidden="true" />
      </div>
    </div>
  );
}
