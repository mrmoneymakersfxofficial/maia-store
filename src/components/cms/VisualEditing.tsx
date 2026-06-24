"use client";

import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

/**
 * Renders the Sanity Visual Editing overlay.
 * This component is safe to include in the layout — it only activates
 * when draft mode is enabled (i.e., when previewing from the Studio).
 * In production, it renders nothing.
 */
export function VisualEditing() {
  return <SanityVisualEditing />;
}