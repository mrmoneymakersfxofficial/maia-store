import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const redirectUrl = new URL(request.url).searchParams.get("redirect") || "/";
  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
