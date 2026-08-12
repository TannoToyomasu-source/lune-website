import type { Metadata } from "next";
import { PrivacyPage } from "@/components/privacy/PrivacyPage";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "Lune 東川口 浦和美園における個人情報の取り扱いについてご案内します。",
};

export default function PrivacyRoutePage() {
  return <PrivacyPage />;
}
