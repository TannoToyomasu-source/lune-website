import type { Metadata } from "next";
import { QaPage } from "@/components/qa/QaPage";

export const metadata: Metadata = {
  title: "Q&A",
  description:
    "初めてご来院いただく方からよく寄せられるご質問と、キャンセルポリシーをご案内します。",
};

export default function QaRoutePage() {
  return <QaPage />;
}
