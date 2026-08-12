import { BRAND_NAME, BRAND_SHORT } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="/top" className={styles.brand}>
          <img
            src="/brand/Logo.png"
            alt={BRAND_SHORT}
            width={288}
            height={348}
            decoding="async"
          />
          <Typography variant="caption" as="span" className={styles.brandName}>
            {BRAND_NAME}
          </Typography>
        </a>
        <div className={styles.meta}>
          <nav className={styles.nav} aria-label="フッターナビゲーション">
            <Button
              variant="text"
              href="/privacy"
              className={styles.navTextButton}
            >
              プライバシーポリシー
            </Button>
            <span className={styles.navSep} aria-hidden="true">
              |
            </span>
            <Button
              variant="text"
              href="/qa#cancellation-policy"
              className={styles.navTextButton}
            >
              キャンセルポリシー
            </Button>
          </nav>
          <Typography variant="caption" as="p" className={styles.copy}>
            © {BRAND_SHORT}. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
