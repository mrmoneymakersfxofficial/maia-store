"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@sanity/client";

/**
 * SanityLive — Enables real-time content updates when in draft mode.
 *
 * Subscribes to Sanity document mutations and triggers a page reload
 * when any document changes in the Studio. This ensures the preview
 * stays in sync with edits.
 *
 * Only activates when Next.js draft mode is enabled (cookie present).
 * Renders nothing (returns null).
 */
export function SanityLive() {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Only subscribe when draft mode is active
    const isDraft =
      typeof document !== "undefined" &&
      document.cookie.includes("__prerender_bypass");

    if (!isDraft) return;

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const token =
      process.env.SANITY_API_READ_TOKEN ||
      process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

    if (!projectId || !token) return;

    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: false,
      perspective: "previewDrafts",
      token,
    });

    const subscription = client
      .listen(`*[!(_id in path("_.**"))]`)
      .subscribe({
        next: () => {
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