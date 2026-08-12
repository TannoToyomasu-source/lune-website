import { SectionHeading } from "@/components/ui/SectionHeading";
import { Typography } from "@/components/ui/Typography";
import styles from "./first.module.css";

const CLINIC_GRID = [
  { label: "待合室", tone: "a" as const },
  { label: "キッズスペース", tone: "b" as const },
  { label: "受付", tone: "c" as const },
  { label: "パウダールーム", tone: "d" as const },
];

function ComingSoonPhoto({
  label,
  figureClass,
  placeholderClass,
}: {
  label: string;
  figureClass: string;
  placeholderClass: string;
}) {
  return (
    <figure className={figureClass}>
      <div className={styles.clinicPhotoFrame}>
        <div
          className={placeholderClass}
          role="img"
          aria-label={`${label}（準備中）`}
        />
        <span className={styles.comingSoon} aria-hidden="true">
          Coming Soon
        </span>
      </div>
      <Typography variant="caption" as="figcaption">
        {label}
      </Typography>
    </figure>
  );
}

export function FirstClinic() {
  return (
    <section
      className={`${styles.section} ${styles.clinic}`}
      aria-labelledby="clinic-heading"
    >
      <SectionHeading
        className={`${styles.sectionHeading} ${styles.reveal}`}
        eyebrow="CLINIC"
        title={<span id="clinic-heading">院内紹介</span>}
      />
      <div className={`${styles.clinicGrid} ${styles.reveal}`}>
        <ComingSoonPhoto
          label="施術室"
          figureClass={styles.clinicMain}
          placeholderClass={`${styles.photoPlaceholder} ${styles.clinicMainPhoto}`}
        />
        <div className={styles.clinicThumbs}>
          {CLINIC_GRID.map((item) => (
            <ComingSoonPhoto
              key={item.label}
              label={item.label}
              figureClass={styles.clinicThumb}
              placeholderClass={[
                styles.photoPlaceholder,
                item.tone === "a"
                  ? styles.toneA
                  : item.tone === "b"
                    ? styles.toneB
                    : item.tone === "c"
                      ? styles.toneC
                      : styles.toneD,
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
