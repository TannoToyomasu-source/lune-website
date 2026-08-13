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

/** OGP 用の絶対URL。独自ドメイン未設定時は Vercel の本番URLを使う */
function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) return `https://${productionHost.replace(/\/$/, "")}`;

  const deploymentHost = process.env.VERCEL_URL?.trim();
  if (deploymentHost) return `https://${deploymentHost.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
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
