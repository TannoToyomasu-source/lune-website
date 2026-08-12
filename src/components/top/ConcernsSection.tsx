import { Typography } from "@/components/ui/Typography";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./concerns.module.css";

const CONCERNS = [
  {
    id: "posture",
    title: "姿勢・身体の歪み",
    body: "猫背や反り腰、骨盤の左右差が気になる",
    image: "/problem_1.svg",
  },
  {
    id: "shoulder",
    title: "肩こり・首こり",
    body: (
      <>
        デスクワークや抱っこで
        <br />
        首肩のこりがつらい
      </>
    ),
    image: "/problem_2.svg",
  },
  {
    id: "back",
    title: "腰痛・疲れやすさ",
    body: "慢性的な腰の重さや身体のだるさがある",
    image: "/problem_4.svg",
  },
  {
    id: "maternity",
    title: "マタニティ期の不調",
    body: (
      <>
        妊娠中の腰痛やむくみ、
        <br />
        身体の負担が気になる
      </>
    ),
    image: "/problem_3.svg",
  },
  {
    id: "postpartum",
    title: "産後の骨盤・体型変化",
    body: "骨盤まわりや姿勢、体型の変化が気になる",
    image: "/problem_5.svg",
  },
  {
    id: "childcare",
    title: "育児による負担",
    body: "肩・腰・手首など育児による疲れが続いている",
    image: "/problem_6.svg",
  },
] as const;

type ConcernsSectionProps = {
  /** スクロール連動で順次表示する */
  active?: boolean;
};

/**
 * TOP：Concept のあとにせり上がる「お悩み」セクション
 * （active 時に見出し→項目を順に表示）
 */
export function ConcernsSection({ active = false }: ConcernsSectionProps) {
  return (
    <div
      className={[
        styles.shell,
        styles.compact,
        active ? styles.active : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.wash} aria-hidden="true" />

      <div className={styles.root}>
      <SectionHeading
        className={`${styles.header} ${styles.stagger}`}
        eyebrow="FOR EVERY WOMAN"
        title={
          <>
            変化する身体に、
            <br />
            やさしく寄り添う。
          </>
        }
        lead={
          <>
            女性のライフステージに合わせた、
            <br />
            心と身体のケアを。
          </>
        }
      />

      <ul className={styles.grid}>
        {CONCERNS.map((item, index) => (
          <li
            key={item.id}
            className={`${styles.item} ${styles.stagger}`}
            style={{ ["--stagger" as string]: index }}
          >
            <div className={styles.iconWrap} aria-hidden="true">
              <div className={styles.iconPlate}>
                <img
                  src={item.image}
                  alt=""
                  width={160}
                  height={200}
                  decoding="async"
                  className={styles.icon}
                />
              </div>
            </div>
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
    </div>
  );
}
