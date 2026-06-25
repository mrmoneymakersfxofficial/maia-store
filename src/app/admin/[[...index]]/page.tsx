"use client";

import { NextStudio } from "next-sanity/studio";
import sanityConfig from "../../../../sanity.config";

/**
 * Sanity Studio — mounted at /admin
 *
 * CRITICAL: `history="hash"` prevents "Tool not found: admin" error.
 * With browser history (default), Studio reads pathname "/admin"
 * and tries to find a tool named "admin" — which doesn't exist.
 * Hash history uses #structure, #presentation in the URL instead.
 */
export default function AdminPage() {
  return <NextStudio config={sanityConfig} history="hash" />;
}