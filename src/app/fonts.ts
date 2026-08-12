import {
  Shippori_Mincho,
  Zen_Old_Mincho,
  Cormorant_Garamond,
  Josefin_Sans,
} from "next/font/google";

/** 見出し・Hero・短いコピー */
export const shipporiMincho = Shippori_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shippori",
  preload: false,
});

/** 本文・Q&A・説明文 */
export const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-old-mincho",
  preload: false,
});

/** 英字ラベル（Concept / First Visit など） */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-cormorant",
});

/** SCROLL インジケーターなど英字UI */
export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-josefin",
});
