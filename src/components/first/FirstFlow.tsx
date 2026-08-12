import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Typography } from "@/components/ui/Typography";
import styles from "./first.module.css";

function FlowDescLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <span key={line} className={styles.flowDescLine}>
          {line}
        </span>
      ))}
    </>
  );
}

const FLOW_STEPS: {
  step: string;
  title: string;
  description: ReactNode;
  icon: string;
}[] = [
  {
    step: "01",
    title: "予約",
    description: (
      <FlowDescLines lines={["予約はこちらから", "お申し込みください"]} />
    ),
    icon: "/flow_reserve.svg",
  },
  {
    step: "02",
    title: "ご来院",
    description: <FlowDescLines lines={["ご予約日時に", "ご来院ください"]} />,
    icon: "/flow_visit.svg",
  },
  {
    step: "03",
    title: "カウンセリング",
    description: <FlowDescLines lines={["お悩みや状態を", "丁寧に伺います"]} />,
    icon: "/flow_counseling.svg",
  },
  {
    step: "04",
    title: "施術",
    description: (
      <FlowDescLines lines={["今の状態に合わせた", "施術を行います"]} />
    ),
    icon: "/flow_treatment.svg",
  },
  {
    step: "05",
    title: "アフターケア",
    description: (
      <FlowDescLines lines={["ご自宅での過ごし方を", "お伝えします"]} />
    ),
    icon: "/flow_home.svg",
  },
];

/**
 * 初めての方へ：施術の流れ
 * PC：縦長ピル / SP：タイムラインカード
 */
export function FirstFlow() {
  return (
    <section className={styles.section} aria-labelledby="flow-heading">
      <SectionHeading
        className={`${styles.sectionHeading} ${styles.reveal}`}
        eyebrow="FLOW"
        title={<span id="flow-heading">施術の流れ</span>}
      />
      <ol className={`${styles.flowList} ${styles.reveal}`}>
        {FLOW_STEPS.map((item, index) => (
          <li key={item.step} className={styles.flowItem}>
            {index > 0 ? (
              <span className={styles.flowConnector} aria-hidden="true" />
            ) : null}
            <article className={styles.flowCard}>
              <div className={styles.flowIconWrap}>
                <img
                  src={item.icon}
                  alt=""
                  width={56}
                  height={56}
                  decoding="async"
                  className={styles.flowIcon}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.flowCopy}>
                <Typography
                  variant="enLabel"
                  as="span"
                  className={styles.flowStep}
                >
                  {item.step}
                </Typography>
                <Typography
                  variant="subheading"
                  as="h3"
                  className={styles.flowTitle}
                >
                  {item.title}
                </Typography>
                <span className={styles.flowRule} aria-hidden="true" />
                <Typography variant="small" className={styles.flowDesc}>
                  {item.description}
                </Typography>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
