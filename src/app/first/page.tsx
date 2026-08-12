import type { Metadata } from "next";
import { First } from "@/components/first/First";

export const metadata: Metadata = {
  title: "初めての方へ",
  description:
    "初めての方にも安心してご来院いただけるよう、施術の流れや院内、FAQをご紹介します。",
};

export default function FirstPage() {
  return <First />;
}
