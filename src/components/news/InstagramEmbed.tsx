"use client";

import { useEffect } from "react";
import styles from "./instagram-embed.module.css";

type InstagramEmbedProps = {
  permalink: string;
};

/**
 * Instagram 公式埋め込み
 */
export function InstagramEmbed({ permalink }: InstagramEmbedProps) {
  useEffect(() => {
    const process = () => {
      const instgrm = (
        window as Window & {
          instgrm?: { Embeds?: { process: () => void } };
        }
      ).instgrm;
      instgrm?.Embeds?.process();
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );

    if (existing) {
      process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, [permalink]);

  return (
    <div className={styles.wrap}>
      <blockquote
        className={`instagram-media ${styles.embed}`}
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          margin: "1px auto",
          maxWidth: "540px",
          minWidth: "326px",
          padding: 0,
          width: "calc(100% - 2px)",
        }}
      >
        <a href={permalink} target="_blank" rel="noopener noreferrer">
          Instagramで投稿を見る
        </a>
      </blockquote>
    </div>
  );
}
