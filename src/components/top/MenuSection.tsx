import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { MENU_ITEMS } from "@/data/menus";
import styles from "./menu-section.module.css";

/**
 * TOP：お悩みのあとに続くメニュー紹介
 */
export function MenuSection() {
  return (
    <div id="menu" className={styles.root}>
      <SectionHeading
        className={styles.header}
        eyebrow="MENU"
        title="メニュー"
      />

      <ul className={styles.grid}>
        {MENU_ITEMS.map((item) => (
          <li key={item.slug} className={styles.card}>
            <div className={styles.media}>
              <img
                src={item.image}
                alt={item.imageAlt}
                width={800}
                height={520}
                decoding="async"
                className={styles.image}
              />
            </div>
            <div className={styles.body}>
              <Typography variant="enLabel" as="p" className={styles.label}>
                {item.label}
              </Typography>
              <Typography variant="heading" as="h3" className={styles.cardTitle}>
                {item.title}
              </Typography>
              <Typography variant="caption" as="p" className={styles.price}>
                {item.price}
              </Typography>
              <Typography variant="small" className={styles.copy}>
                {item.summary}
              </Typography>
              <Link href={`/menu/${item.slug}`} className={styles.more}>
                詳しく見る
                <ArrowRight className={styles.moreArrow} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
