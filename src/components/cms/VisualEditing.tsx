"use client";

import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

/**
 * Renders the Sanity Visual Editing overlay.
 *
 * This component ONLY activates when Next.js draft mode is enabled
 * (i.e., when previewing from the Studio's Presentation Tool).
 *
 * In production (no draft mode cookie), it renders NOTHING.
 * This ensures the overlay NEVER appears on the live website.
 *
 * The "Edit" toggle in the Presentation Tool controls
 * whether the overlay is visible within the CMS preview.
 */
export function VisualEditing() {
  return <SanityVisualEditing />;
}
