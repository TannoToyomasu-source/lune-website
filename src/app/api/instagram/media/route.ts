import { NextResponse } from "next/server";
import {
  getAllNewsPosts,
  getInstagramProfileUrl,
  isInstagramFeedConfigured,
} from "@/lib/instagram-feed";

/**
 * Instagram（Behold）投稿取得
 * GET /api/instagram/media
 */
export async function GET() {
  const posts = await getAllNewsPosts();

  return NextResponse.json(
    {
      posts,
      profileUrl: getInstagramProfileUrl(),
      source: isInstagramFeedConfigured() ? "behold" : "fallback",
    },
    {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
