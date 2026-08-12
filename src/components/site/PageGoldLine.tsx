"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  FIRST_DOT_INDEX,
  FIRST_LINE_POINTS,
  FIRST_LINE_VIEWBOX,
  buildFirstGoldLinePath,
} from "@/components/first/firstGoldLinePath";
import styles from "./page-gold-line.module.css";

type Point = { x: number; y: number };

type PageGoldLineProps = {
  /** スクロール進捗を測るページルート */
  pageRef: React.RefObject<HTMLElement | null>;
  reducedMotion?: boolean;
  /**
   * 目標位置への追従時定数（秒）。
   * 大きいほどゆっくり。約 30 秒かけて進む感覚に合わせる。
   */
  followTau?: number;
  /** 未指定時は初めての方ページ用パス */
  pathD?: string;
  viewBox?: { width: number; height: number };
  points?: ReadonlyArray<Point>;
  dotIndex?: number;
};

function findLengthNearPoint(
  path: SVGPathElement,
  target: { x: number; y: number },
  samples = 320,
) {
  const total = path.getTotalLength();
  if (!total) return 0;

  let bestLen = 0;
  let bestDist = Number.POSITIVE_INFINITY;

  for (let i = 0; i <= samples; i += 1) {
    const len = (total * i) / samples;
    const p = path.getPointAtLength(len);
    const dist = (p.x - target.x) ** 2 + (p.y - target.y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestLen = len;
    }
  }

  const step = total / samples;
  const from = Math.max(bestLen - step, 0);
  const to = Math.min(bestLen + step, total);
  for (let i = 0; i <= 40; i += 1) {
    const len = from + ((to - from) * i) / 40;
    const p = path.getPointAtLength(len);
    const dist = (p.x - target.x) ** 2 + (p.y - target.y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestLen = len;
    }
  }

  return bestLen;
}

function placeDot(
  dot: HTMLElement,
  point: { x: number; y: number },
  viewBox: { width: number; height: number },
) {
  dot.style.left = `${(point.x / viewBox.width) * 100}%`;
  dot.style.top = `${(point.y / viewBox.height) * 100}%`;
}

/**
 * TOP から続くゴールドライン＋ゆっくり進む光玉。
 * スクロール位置を目標に、時定数で滑らかに追従する。
 */
export function PageGoldLine({
  pageRef,
  reducedMotion = false,
  followTau = 10,
  pathD,
  viewBox,
  points,
  dotIndex,
}: PageGoldLineProps) {
  const reactId = useId().replace(/:/g, "");
  const linePathId = `pageGoldLine-${reactId}`;

  const linePoints = points ?? FIRST_LINE_POINTS;
  const lineViewBox = viewBox ?? FIRST_LINE_VIEWBOX;
  const startIndex = dotIndex ?? FIRST_DOT_INDEX;
  const goldLineD = useMemo(
    () => pathD ?? buildFirstGoldLinePath(),
    [pathD],
  );
  const goldDotStart = linePoints[startIndex] ?? linePoints[0];

  const lineRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathLengthRef = useRef(0);
  const startLengthRef = useRef(0);
  const startReadyRef = useRef(false);
  const progressRef = useRef(0);
  const targetRef = useRef(0);

  const [lineReady, setLineReady] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setLineReady(true);
      return;
    }
    const id = window.setTimeout(() => setLineReady(true), 900);
    return () => window.clearTimeout(id);
  }, [reducedMotion]);

  useEffect(() => {
    const path = lineRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    pathLengthRef.current = length;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = lineReady || reducedMotion ? "0" : `${length}`;

    const startLen = findLengthNearPoint(path, goldDotStart);
    startLengthRef.current = startLen;
    startReadyRef.current = true;
    const start = path.getPointAtLength(startLen);
    const dot = dotRef.current;
    if (dot) placeDot(dot, start, lineViewBox);
  }, [lineReady, reducedMotion, goldLineD, goldDotStart, lineViewBox]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    let rafId = 0;
    let last = performance.now();

    const readScrollTarget = () => {
      const rect = page.getBoundingClientRect();
      const scrollable = Math.max(page.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      targetRef.current = scrolled / scrollable;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      readScrollTarget();

      const path = lineRef.current;
      const dot = dotRef.current;
      if (path && dot && startReadyRef.current) {
        const length = pathLengthRef.current || path.getTotalLength();
        const startLen = startLengthRef.current;
        if (length) {
          if (reducedMotion) {
            progressRef.current = 0;
          } else {
            const target = targetRef.current;
            const alpha = 1 - Math.exp(-dt / followTau);
            progressRef.current += (target - progressRef.current) * alpha;
          }

          const t = Math.min(Math.max(progressRef.current, 0), 1);
          const eased = t * t * (3 - 2 * t);
          const len = startLen + (length - startLen) * eased;
          placeDot(dot, path.getPointAtLength(len), lineViewBox);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", readScrollTarget);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", readScrollTarget);
    };
  }, [pageRef, reducedMotion, followTau, lineViewBox]);

  return (
    <div
      className={[styles.wrap, lineReady ? styles.drawn : ""].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${lineViewBox.width} ${lineViewBox.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id={linePathId}
            gradientUnits="userSpaceOnUse"
            x1="700"
            y1="0"
            x2="900"
            y2="3600"
          >
            <stop offset="0%" stopColor="#E8D4A8" stopOpacity="0.88" />
            <stop offset="50%" stopColor="#D8B77A" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#C09A56" stopOpacity="0.38" />
          </linearGradient>
        </defs>
        <path
          ref={lineRef}
          className={styles.path}
          d={goldLineD}
          fill="none"
          stroke={`url(#${linePathId})`}
        />
      </svg>
      <div
        ref={dotRef}
        className={styles.dot}
        style={{
          left: `${(goldDotStart.x / lineViewBox.width) * 100}%`,
          top: `${(goldDotStart.y / lineViewBox.height) * 100}%`,
        }}
      >
        <span className={styles.dotGlow} />
        <span className={styles.dotCore} />
      </div>
    </div>
  );
}
