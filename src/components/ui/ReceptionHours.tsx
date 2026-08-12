import { RECEPTION_INFO } from "@/lib/reservation";
import styles from "./reception-hours.module.css";

type ReceptionHoursProps = {
  className?: string;
};

/**
 * 受付時間・定休日（金の上下ライン）
 */
export function ReceptionHours({ className = "" }: ReceptionHoursProps) {
  return (
    <dl className={[styles.hours, className].filter(Boolean).join(" ")}>
      <div className={styles.row}>
        <dt>{RECEPTION_INFO.hoursLabel}</dt>
        <dd>{RECEPTION_INFO.hours}</dd>
      </div>
      <div className={styles.row}>
        <dt>{RECEPTION_INFO.holidayLabel}</dt>
        <dd>{RECEPTION_INFO.holiday}</dd>
      </div>
    </dl>
  );
}
