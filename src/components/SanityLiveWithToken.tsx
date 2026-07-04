"use client";
import { useEffect, useRef } from "react";
import { createClient } from "@sanity/client";

interface Props {
  includeDrafts?: boolean;
}

export function SanityLiveWithToken({ includeDrafts }: Props) {
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;
    if (!projectId || !token) return;

    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: false,
      perspective: includeDrafts ? "previewDrafts" : "published",
      token,
    });

    const sub = client
      .listen(`*[!(_id in path("_.**"))]`)
      .subscribe({
        next: () => {
          if (typeof window !== "undefined") window.location.reload();
        },
        error: (err: Error) => {
          console.warn("[SanityLive] Listener error:", err.message);
        },
      });

    unsubRef.current = () => sub.unsubscribe();
    return () => unsubRef.current?.();
  }, [includeDrafts]);

  return null;
}
