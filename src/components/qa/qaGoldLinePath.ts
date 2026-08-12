/**
 * Q&A ページ用ゴールドライン。
 * 編集する場合はこの POINTS を動かしてください。
 */

export type Point = { x: number; y: number };

export const QA_LINE_VIEWBOX = {
  width: 1440,
  height: 2800,
} as const;

/** 光玉の開始インデックス */
export const QA_DOT_INDEX = 0;

export const QA_LINE_POINTS: ReadonlyArray<Point> = [
  { x: 1180, y: 40 },
  { x: 1080, y: 280 },
  { x: 980, y: 520 },
  { x: 920, y: 780 },
  { x: 860, y: 1040 },
  { x: 820, y: 1320 },
  { x: 780, y: 1600 },
  { x: 740, y: 1880 },
  { x: 700, y: 2160 },
  { x: 660, y: 2440 },
  { x: 620, y: 2720 },
];

function catmullRomToBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): string {
  const c1x = p1.x + (p2.x - p0.x) / 6;
  const c1y = p1.y + (p2.y - p0.y) / 6;
  const c2x = p2.x - (p3.x - p1.x) / 6;
  const c2y = p2.y - (p3.y - p1.y) / 6;
  return `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
}

export function buildQaGoldLinePath(
  points: ReadonlyArray<Point> = QA_LINE_POINTS,
): string {
  if (points.length < 2) return "";
  const parts = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    parts.push(catmullRomToBezier(p0, p1, p2, p3));
  }
  return parts.join(" ");
}
