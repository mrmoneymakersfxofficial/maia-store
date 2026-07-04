"use client";
import { useEffect, useState } from "react";
import { VisualEditing as SanityVE } from "next-sanity/visual-editing";

export function VisualEditing() {
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    try {
      setInIframe(window.self !== window.top);
    } catch {
      setInIframe(true);
    }
  }, []);

  if (!inIframe) return null;
  return <SanityVE />;
}
