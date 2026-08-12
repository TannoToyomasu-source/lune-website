import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Typography } from "@/components/ui/Typography";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { CLINIC } from "@/data/clinic";
import styles from "./access-section.module.css";

/**
 * TOP：アクセス（店舗情報・地図・駐車場）
 * ヘッダーと同色のソリッド背景で、フッター直前に置く
 */
export function AccessSection() {
  return (
    <section id="access" className={styles.root} aria-label="アクセス">
      <div className={styles.inner}>
        <SectionHeading
          className={styles.header}
          eyebrow="ACCESS"
          title="アクセス"
        />

        <div className={styles.layout}>
          <div className={styles.colLeft}>
            <div className={styles.storeInfo}>
              <Typography variant="heading" as="h3" className={styles.storeName}>
                {CLINIC.name}
              </Typography>
              <address className={styles.address}>
                <Typography variant="small" as="p" className={styles.addressLine}>
                  {CLINIC.postalCode}
                </Typography>
                {CLINIC.addressLines.map((line) => (
                  <Typography
                    key={line}
                    variant="small"
                    as="p"
                    className={styles.addressLine}
                  >
                    {line}
                  </Typography>
                ))}
                <Typography variant="small" as="p" className={styles.phone}>
                  {CLINIC.phoneLabel}
                  <br />
                  <a href={`tel:${CLINIC.phoneTel}`} className={styles.phoneLink}>
                    {CLINIC.phoneDisplay}
                  </a>
                </Typography>
              </address>
            </div>

            <div className={styles.mapBlock}>
              <Button
                variant="stroke"
                href={CLINIC.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapButton}
              >
                Google Map
                <ArrowRight className={styles.mapButtonArrow} />
              </Button>
              <div className={styles.mapEmbed}>
                <iframe
                  title="Lune 東川口 浦和美園の地図"
                  src={CLINIC.googleMapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className={styles.mapFrame}
                />
              </div>
            </div>
          </div>

          <div className={styles.colRight}>
            <figure className={styles.parkingMap}>
              {CLINIC.parkingMapSrc ? (
                <img
                  src={CLINIC.parkingMapSrc}
                  alt={CLINIC.parkingMapAlt}
                  width={1448}
                  height={1086}
                  decoding="async"
                  className={styles.parkingImage}
                />
              ) : (
                <div
                  className={styles.parkingPlaceholder}
                  role="img"
                  aria-label={CLINIC.parkingMapAlt}
                >
                  駐車場簡易地図
                </div>
              )}
            </figure>

            <div className={styles.parkingCopy}>
              <Typography
                variant="subheading"
                as="h3"
                className={styles.parkingTitle}
              >
                {CLINIC.parkingTitle}
              </Typography>
              <Typography variant="small" className={styles.parkingBody}>
                {CLINIC.parkingBody.map((paragraph) => (
                  <span key={paragraph} className={styles.parkingParagraph}>
                    {paragraph}
                  </span>
                ))}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
