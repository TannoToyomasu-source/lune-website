import type { Metadata } from "next";
import { BRAND_NAME, BRAND_SHORT } from "@/lib/brand";
import {
  cormorantGaramond,
  josefinSans,
  shipporiMincho,
  zenOldMincho,
} from "./fonts";
import "./globals.css";

const siteDescription = `${BRAND_NAME}。女性のライフステージに寄り添う整体サロン。`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`,
  },
  description: siteDescription,
  openGraph: {
    title: BRAND_NAME,
    description: siteDescription,
    siteName: BRAND_SHORT,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${BRAND_SHORT} — 女性のライフステージに寄り添う`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={[
        shipporiMincho.variable,
        zenOldMincho.variable,
        cormorantGaramond.variable,
        josefinSans.variable,
        "h-full",
      ].join(" ")}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
