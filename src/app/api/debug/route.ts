import { NextResponse } from "next/server";

/**
 * /api/debug — Diagnostic endpoint
 *
 * Returns a comprehensive JSON with the status of all critical systems.
 * Open in browser to diagnose issues.
 */
export async function GET() {
  const env = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "MISSING",
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || "MISSING",
    NEXT_PUBLIC_SANITY_API_READ_TOKEN: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN
      ? `${process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN.slice(0, 8)}...${process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN.slice(-6)}`
      : "MISSING",
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN
      ? `${process.env.SANITY_API_READ_TOKEN.slice(0, 8)}...${process.env.SANITY_API_READ_TOKEN.slice(-6)}`
      : "MISSING",
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET
      ? `${process.env.SANITY_PREVIEW_SECRET.slice(0, 8)}...${process.env.SANITY_PREVIEW_SECRET.slice(-6)}`
      : "NOT SET (optional — draft mode works without it)",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "NOT SET (using fallback)",
    VERCEL_URL: process.env.VERCEL_URL || "NOT SET (expected on Vercel)",
    NODE_ENV: process.env.NODE_ENV || "MISSING",
  };

  // Compute the site URL that sanity.config.ts would use
  let computedSiteUrl = "NOT COMPUTED";
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    computedSiteUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  } else if (process.env.VERCEL_URL) {
    computedSiteUrl = `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  } else {
    computedSiteUrl = "https://maia-store.vercel.app (hardcoded fallback)";
  }

  const result = {
    timestamp: new Date().toISOString(),
    runtime: "Next.js App Router",
    nodeEnv: process.env.NODE_ENV || "unknown",
    env,
    computed: {
      siteUrl: computedSiteUrl,
      previewUrl: `${computedSiteUrl}/api/preview`,
      studioUrl: `${computedSiteUrl}/admin`,
    },
    schemas: [
      "siteSettings (singleton — config del sitio)",
      "product (joyas — con categoría, precio, imágenes, galería)",
      "productCategory (categorías — Pulseras, Aretes, Collares, etc.)",
      "heroSlide (slides del hero)",
      "testimonial (testimonios)",
      "studioGuide (guía interna)",
    ],
    issues: [] as string[],
  };

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) result.issues.push("NEXT_PUBLIC_SANITY_PROJECT_ID is missing — Studio won't load");
  if (!process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN) result.issues.push("NEXT_PUBLIC_SANITY_API_READ_TOKEN is missing — live preview won't work");
  if (!process.env.SANITY_API_READ_TOKEN) result.issues.push("SANITY_API_READ_TOKEN (server-side) is missing — needed for draft queries");

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}