/**
 * /first ページ用ゴールドライン
 * TOP から続く一本の線として、上端から下端へゆるく案内する。
 *
 * 座標系（viewBox 1440 × 3600）
 */

export const FIRST_LINE_VIEWBOX = {
  width: 1440,
  height: 3600,
} as const;

type Point = { x: number; y: number };

export const FIRST_LINE_POINTS: ReadonlyArray<Point> = [
  { x: 780, y: 0 }, // TOP下端から続くイメージ
  { x: 820, y: 180 },
  { x: 900, y: 360 },
  { x: 980, y: 520 }, // Hero 右寄り
  { x: 1040, y: 720 },
  { x: 980, y: 960 }, // 流れへ
  { x: 820, y: 1180 },
  { x: 620, y: 1380 },
  { x: 480, y: 1600 }, // 院長付近
  { x: 420, y: 1860 },
  { x: 520, y: 2140 },
  { x: 720, y: 2380 }, // 院内
  { x: 900, y: 2620 },
  { x: 980, y: 2900 }, // FAQ
  { x: 880, y: 3180 },
  { x: 720, y: 3400 },
  { x: 640, y: 3600 }, // 下端
];

export const FIRST_DOT_INDEX = 2;

const SMOOTHNESS = 0.64;

function lerp(a: Point, b: Point, t: number): Point {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}

function refinePoints(points: ReadonlyArray<Point>): Point[] {
  if (points.length < 3) return [...points];

  const out: Point[] = [points[0]];
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    out.push(lerp(a, b, 0.25));
    out.push(lerp(a, b, 0.75));
  }
  out.push(points[points.length - 1]);
  return out;
}

export function buildFirstGoldLinePath(
  points: ReadonlyArray<Point> = FIRST_LINE_POINTS,
): string {
  if (points.length < 2) return "";

  const pts = refinePoints(refinePoints(refinePoints(points)));
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;

  for (let i = 0; i < n - 1; i += 1) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, n - 1)];

    const c1x = p1.x + ((p2.x - p0.x) / 6) * SMOOTHNESS * 2;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * SMOOTHNESS * 2;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * SMOOTHNESS * 2;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * SMOOTHNESS * 2;

    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}
