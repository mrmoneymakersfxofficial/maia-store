"use client";

import { useEffect, useRef } from "react";
import { createClient, type SanityClient } from "@sanity/client";

/**
 * SanityLive — Enables real-time content updates when in draft mode.
 *
 * In next-sanity v13, `useLiveMode` was removed. This component uses
 * the `@sanity/client` listen() API directly to subscribe to document
 * changes and force a page refresh when content is updated in the Studio.
 *
 * Only activates when Next.js draft mode is enabled.
 * Renders nothing (returns null).
 */
export function SanityLive() {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const token = process.env.SANITY_API_READ_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

    if (!projectId || !token) return;

    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: false,
      perspective: "previewDrafts",
      token,
    });

    // Subscribe to ALL document mutations and refresh the page
    // This ensures the preview stays in sync with Studio edits
    const subscription = client.listen(`*[!(_id in path("_.**"))]`).subscribe({
      next: () => {
        // Refresh the current page to pick up changes
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      },
      error: (err: Error) => {
        console.warn("[SanityLive] Listener error:", err.message);
      },
    });

    unsubscribeRef.current = () => subscription.unsubscribe();

    return () => {
      unsubscribeRef.current?.();
    };
  }, []);

  return null;
}