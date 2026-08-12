import { SectionHeading } from "@/components/ui/SectionHeading";
import { Typography } from "@/components/ui/Typography";
import styles from "./first.module.css";

/**
 * 初めての方へ：初回限定プラン
 */
export function FirstOffer() {
  return (
    <section
      className={`${styles.section} ${styles.offer}`}
      aria-labelledby="offer-heading"
    >
      <SectionHeading
        className={`${styles.sectionHeading} ${styles.reveal}`}
        eyebrow="FIRST PLAN"
        title={<span id="offer-heading">初めてご来院の方へ</span>}
      />

      <div
        className={`${styles.offerPanel} ${styles.reveal} ${styles.offerRise}`}
      >
        <figure className={styles.offerFigure}>
          <img
            src="/counseling.jpg"
            alt="施術のイメージ"
            width={900}
            height={600}
            decoding="async"
            className={styles.offerImage}
          />
        </figure>

        <div className={styles.offerBody}>
          <Typography variant="body" className={styles.offerLead}>
            カウンセリング・検査・施術・アフターケアを含めた、特別な初回プランです。
          </Typography>

          <div className={styles.offerFact}>
            <Typography variant="label" as="p" className={styles.offerLabel}>
              所要時間
            </Typography>
            <p className={styles.offerDurationValue}>
              <span className={styles.offerAffix}>約</span>
              <span className={styles.offerNumber}>90</span>
              <span className={styles.offerAffix}>分</span>
            </p>
            <Typography variant="caption" as="p" className={styles.offerNote}>
              ※お身体の状態、施術内容によって前後します。
            </Typography>
          </div>

          <div className={styles.offerPriceBlock}>
            <Typography
              variant="caption"
              as="p"
              className={styles.offerRegular}
            >
              通常料金{" "}
              <span className={styles.offerStrike}>11,000円（税込）〜</span>
            </Typography>

            <p className={styles.offerBadgeLine}>
              <span className={styles.offerBadge}>初回限定</span>
            </p>

            <p className={styles.offerSpecialPrice}>
              <span className={styles.offerSpecialNumber}>5,980</span>
              <span className={styles.offerYen}>円</span>
              <span className={styles.offerTax}>（税込）</span>
            </p>

            <Typography variant="caption" as="p" className={styles.offerNote}>
              ※おひとり様一回限りのご利用となります。
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
