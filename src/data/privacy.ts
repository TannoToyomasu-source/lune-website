import { LINE_RESERVATION_URL, RECEPTION_INFO } from "@/lib/reservation";
import { CLINIC } from "@/data/clinic";

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

/**
 * プライバシーポリシー本文
 */
export const PRIVACY_INTRO =
  "Lune 東川口 浦和美園（以下「当院」といいます）は、お客様の個人情報を適切に取り扱い、安心してご利用いただける環境づくりに努めます。";

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "collection",
    title: "1．個人情報の取得について",
    paragraphs: [
      "当院は、LINEやお問い合わせ、カウンセリングシートへのご記入などを通じて、必要な範囲で個人情報を取得いたします。",
    ],
  },
  {
    id: "purpose",
    title: "2．個人情報の利用目的",
    paragraphs: [
      "取得した個人情報は、以下の目的の範囲で利用いたします。",
    ],
    bullets: [
      "ご予約の受付、確認、変更のご連絡",
      "施術、サービスの提供およびご案内",
      "お身体の状態の把握、施術計画の作成",
      "お問い合わせへの対応",
      "必要に応じたご連絡や重要なお知らせ",
    ],
  },
  {
    id: "third-party",
    title: "3．個人情報の第三者提供について",
    paragraphs: [
      "当院は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。",
    ],
  },
  {
    id: "management",
    title: "4．個人情報の管理について",
    paragraphs: [
      "当院は、個人情報の正確性を保ち、紛失、漏えい、不正アクセス、改ざんなどを防止するため、必要かつ適切な安全管理措置を講じます。",
    ],
  },
  {
    id: "disclosure",
    title: "5．個人情報の開示・訂正・削除について",
    paragraphs: [
      "ご本人から個人情報の開示、訂正、削除などのご請求があった場合は、ご本人確認のうえ、法令に基づき適切に対応いたします。",
    ],
  },
  {
    id: "cookies",
    title: "6．クッキー（Cookie）等の利用について",
    paragraphs: [
      "当サイトでは、サービス向上のためにCookie等を利用することがありますが、個人を特定する情報を取得することはありません。",
    ],
  },
  {
    id: "changes",
    title: "7．プライバシーポリシーの変更について",
    paragraphs: [
      "本ポリシーの内容は、法令の改正や当院の運営方針により、予告なく変更することがあります。",
      "変更後は、当サイト上にてお知らせいたします。",
    ],
  },
];

export const PRIVACY_CONTACT = {
  title: "8．お問い合わせ窓口",
  lead: "個人情報の取り扱いに関するご質問やご相談は、下記までご連絡ください。",
  name: CLINIC.name,
  postalCode: CLINIC.postalCode,
  address: CLINIC.addressLines.join(" "),
  phoneDisplay: CLINIC.phoneDisplay,
  phoneTel: CLINIC.phoneTel,
  hours: `${RECEPTION_INFO.hoursLabel}：${RECEPTION_INFO.hours}`,
  lineUrl: LINE_RESERVATION_URL,
  lineLabel: "LINE",
} as const;
