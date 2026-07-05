"use client";
import { useEffect, useState } from "react";
import { VisualEditing as SanityVE } from "next-sanity/visual-editing";

/**
 * Renders the Sanity Visual Editing overlay.
 *
 * DOUBLE GUARD:
 *  1. iframe detection — only renders inside the Presentation Tool iframe
 *  2. draftMode()     — next-sanity/visual-editing only activates with draft cookie
 *
 * On the public website (no iframe, no draft cookie), this renders NOTHING.
 */
export function VisualEditing() {
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    try {
      // window.top throws in cross-origin iframes — treat as iframe
      setInIframe(window.self !== window.top);
    } catch {
      setInIframe(true);
    }
  }, []);

  // NEVER render on the public site
  if (!inIframe) return null;

  return <SanityVE />;
}
