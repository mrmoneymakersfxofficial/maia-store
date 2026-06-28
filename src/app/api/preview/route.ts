import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * /api/preview
 *
 * Called by Sanity Presentation Tool to enable Next.js draft mode.
 * If SANITY_PREVIEW_SECRET is set, validates it first.
 * Otherwise, enables draft mode directly (Studio is already behind auth).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Optional secret validation
  const secret = searchParams.get("secret");
  const previewSecret = process.env.SANITY_PREVIEW_SECRET;
  if (previewSecret && secret !== previewSecret) {
    console.error("[preview] Invalid preview secret provided");
    return NextResponse.json(
      { error: "Invalid preview secret" },
      { status: 401 },
    );
  }

  const redirectUrl = searchParams.get("redirect") || "/";

  // Enable Next.js draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the target URL with draft mode cookie set
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const url = new URL(redirectUrl, baseUrl);

  return NextResponse.redirect(url);
}