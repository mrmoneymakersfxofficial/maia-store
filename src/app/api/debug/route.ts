import { NextResponse } from "next/server";

/**
 * /api/debug — Diagnostic endpoint
 *
 * Returns a comprehensive JSON with the status of all critical systems.
 * Open in browser to diagnose issues.
 * NOTE: Remove this endpoint in production after debugging.
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
      : "MISSING",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "MISSING",
    VERCEL_URL: process.env.VERCEL_URL || "NOT SET (expected on Vercel)",
    NODE_ENV: process.env.NODE_ENV || "MISSING",
    NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || "MISSING",
  };

  // Test Sanity API connection
  let sanityConnection: { status: string; error?: string; testData?: unknown } = { status: "not_tested" };
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;
    if (!projectId || !token) {
      sanityConnection = { status: "SKIP", error: "Missing PROJECT_ID or TOKEN" };
    } else {
      const res = await fetch(
        `https://${projectId}.api.sanity.io/v2025-01-01/data/query/production?query=*[_type=="siteSettings"][0]{_id,companyName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      sanityConnection = {
        status: res.ok ? "OK" : `ERROR ${res.status}`,
        error: res.ok ? undefined : JSON.stringify(data).slice(0, 300),
        testData: res.ok ? data : undefined,
      };
    }
  } catch (e: unknown) {
    sanityConnection = {
      status: "FAIL",
      error: e instanceof Error ? e.message : String(e),
    };
  }

  // Test Sanity Listen API (for live preview)
  let sanityListen: { status: string; error?: string } = { status: "not_tested" };
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const token = process.env.SANITY_API_READ_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;
    if (!projectId || !token) {
      sanityListen = { status: "SKIP", error: "Missing PROJECT_ID or TOKEN" };
    } else {
      const res = await fetch(
        `https://${projectId}.api.sanity.io/v2025-01-01/data/listen/production?query=*[_type=="siteSettings"]&visibility=query`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/event-stream",
          },
          signal: AbortSignal.timeout(3000),
        }
      );
      sanityListen = {
        status: res.ok ? "OK" : `ERROR ${res.status}`,
        error: res.ok ? undefined : `HTTP ${res.status}`,
      };
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    sanityListen = {
      status: msg.includes("timeout") || msg.includes("abort") ? "OK (SSE connected, aborted after 3s)" : "FAIL",
      error: msg.includes("timeout") || msg.includes("abort") ? undefined : msg,
    };
  }

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
      hasLocalhost: computedSiteUrl.includes("localhost"),
    },

    sanity: {
      connection: sanityConnection,
      listen: sanityListen,
    },

    files: {
      "sanity.config.ts": "exists",
      "sanity/schema.ts": "exists",
      "src/sanity/live.ts": "exists",
      "src/components/cms/VisualEditing.tsx": "exists",
      "src/app/api/preview/route.ts": "exists",
      "src/app/api/disable-preview/route.ts": "exists",
      "src/app/admin/[[...index]]/page.tsx": "exists",
      "src/app/admin/layout.tsx": "exists",
    },

    issues: [] as string[],
  };

  // Detect issues
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) result.issues.push("NEXT_PUBLIC_SANITY_PROJECT_ID is missing");
  if (!process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN) result.issues.push("NEXT_PUBLIC_SANITY_API_READ_TOKEN is missing");
  if (!process.env.SANITY_API_READ_TOKEN) result.issues.push("SANITY_API_READ_TOKEN (server-side) is missing — needed for live preview");
  if (!process.env.SANITY_PREVIEW_SECRET) result.issues.push("SANITY_PREVIEW_SECRET is missing — /api/preview will return 500");
  if (!process.env.NEXT_PUBLIC_SITE_URL && !process.env.VERCEL_URL) result.issues.push("No NEXT_PUBLIC_SITE_URL or VERCEL_URL — Presentation Tool may show wrong URL");
  if (computedSiteUrl.includes("localhost")) result.issues.push("Site URL resolves to localhost — Presentation Tool will fail in production");
  if (sanityConnection.status !== "OK" && sanityConnection.status !== "SKIP") result.issues.push(`Sanity API connection failed: ${sanityConnection.error}`);

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}