import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * /api/disable-preview
 *
 * Disables Next.js draft mode and redirects to the same page
 * without the draft mode cookie. Used by the Presentation Tool
 * to exit preview mode.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/";

  // Disable Next.js draft mode
  const draft = await draftMode();
  draft.disable();

  // Redirect to the target URL without draft mode
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `https://${process.env.VERCEL_URL}` ||
    "https://maia-store.vercel.app";
  const url = new URL(redirectUrl, baseUrl);

  return NextResponse.redirect(url);
}