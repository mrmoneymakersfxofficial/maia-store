import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * /api/preview
 *
 * Called by Sanity Presentation Tool to enable Next.js draft mode.
 * Validates the preview secret, enables draft mode, then redirects
 * to the appropriate page so edits appear in real-time.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const redirectUrl = searchParams.get("redirect") || "/";

  // Validate preview secret
  const previewSecret = process.env.SANITY_PREVIEW_SECRET;
  if (!previewSecret) {
    console.error("[preview] SANITY_PREVIEW_SECRET is not configured in env");
    return NextResponse.json(
      { error: "Preview secret not configured on server" },
      { status: 500 },
    );
  }

  if (secret !== previewSecret) {
    console.error("[preview] Invalid preview secret provided");
    return NextResponse.json(
      { error: "Invalid preview secret" },
      { status: 401 },
    );
  }

  // Enable Next.js draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the target URL with draft mode cookie set
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const url = new URL(redirectUrl, baseUrl);

  return NextResponse.redirect(url);
}