import { Typography } from "@/components/ui/Typography";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./reasons.module.css";

const REASONS = [
  {
    id: "01",
    title: "完全マンツーマン",
    body: "一人ひとりの身体に合わせて丁寧に施術します。",
    image: "/reasons_1to1.png",
    imageAlt: "マンツーマン施術のイラスト",
  },
  {
    id: "02",
    title: "お子様連れOK",
    body: "育児中でも通いやすい環境を整えています。",
    image: "/reasons_baby.png",
    imageAlt: "お子様連れOKのイラスト",
  },
  {
    id: "03",
    title: "女性施術者",
    body: "女性ならではのお悩みも安心してご相談いただけます。",
    image: "/reasons_woman.png",
    imageAlt: "女性施術者のイラスト",
  },
  {
    id: "04",
    title: "妊活・マタニティ・産後対応",
    body: "ライフステージに合わせてやさしく整えます。",
    image: "/reasons_maternity.png",
    imageAlt: "マタニティケアのイラスト",
  },
  {
    id: "05",
    title: "ホームケアサポート",
    body: "施術後のセルフケアまで丁寧にお伝えします。",
    image: "/reasons_home.png",
    imageAlt: "ホームケアサポートのイラスト",
  },
  {
    id: "06",
    title: "お車でも通いやすい",
    body: "駐車場のご案内があり、安心してご来院いただけます。",
    image: "/reasons_car.png",
    imageAlt: "お車で通いやすいことのイラスト",
  },
] as const;

type ReasonsSectionProps = {
  /** スクロール連動で順次表示する */
  active?: boolean;
};

/**
 * TOP：選ばれる理由（active 時に見出し→項目を順に表示）
 */
export function ReasonsSection({ active = false }: ReasonsSectionProps) {
  return (
    <div
      className={[
        styles.root,
        styles.compact,
        active ? styles.active : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SectionHeading
        className={`${styles.header} ${styles.stagger}`}
        eyebrow="REASONS"
        title="Luneが選ばれる理由"
      />

      <ul className={styles.grid}>
        {REASONS.map((item, index) => (
          <li
            key={item.id}
            className={`${styles.item} ${styles.stagger}`}
            style={{ ["--stagger" as string]: index }}
          >
            <div className={styles.iconWrap} aria-hidden="true">
              <img
                src={item.image}
                alt=""
                width={160}
                height={200}
                decoding="async"
                className={styles.iconImage}
              />
            </div>
            <Typography variant="enLabel" as="p" className={styles.number}>
              {item.id}
            </Typography>
            <Typography variant="subheading" as="h3" className={styles.itemTitle}>
              {item.title}
            </Typography>
            <Typography variant="small" className={styles.itemBody}>
              {item.body}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
