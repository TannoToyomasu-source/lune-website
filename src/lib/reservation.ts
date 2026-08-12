/**
 * 予約導線の URL
 */
export const LINE_RESERVATION_URL = "https://line.me/R/ti/p/@207eqvgq";

export const WEB_RESERVATION_URL =
  "https://liff.line.me/2008560290-n9edfAhw?salonSlug=salon-agz6evcp";

/** LINE相談（予約とは別導線） */
export const LINE_CONSULT_URL = LINE_RESERVATION_URL;

/** 受付案内（予約ボタン下に表示） */
export const RECEPTION_INFO = {
  hoursLabel: "営業時間",
  hours: "12:00〜21:00",
  holidayLabel: "定休日",
  holiday: "不定休",
} as const;

export const RESERVATION_OPTIONS = [
  {
    id: "web",
    label: "予約はこちら",
    href: WEB_RESERVATION_URL,
    primary: true,
  },
  {
    id: "line",
    label: "LINEで相談",
    href: LINE_CONSULT_URL,
    primary: false,
  },
] as const;
