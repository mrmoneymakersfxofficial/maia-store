import { createDataAttribute } from "@sanity/visual-editing-csm";

// Pre-create base with studio URL
const base = createDataAttribute({ baseUrl: "/admin" });

// Cache of created data attribute strings to avoid recreating on every render
const cache = new Map<string, string>();

/**
 * Generates `data-sanity` attributes for the Visual Editing overlay.
 * ONLY renders overlay in draft mode (Presentation Tool iframe via `SanityVisualEditing`).
 * On the public site, these are inert HTML attributes with zero runtime cost.
 *
 * IMPORTANT: Only call with real Sanity document IDs (starting with a letter
 * or hex char, NOT with `store-` prefixed fallback IDs).
 */
export function ve(id: string, type: string, path: string): Record<string, string> {
  // Skip for fallback/store IDs to avoid createDataAttribute errors
  if (!id || id.startsWith("store-")) return {};

  const key = `${id}:${type}:${path}`;
  let value = cache.get(key);
  if (!value) {
    try {
      const da = createDataAttribute({ id, type, path, baseUrl: "/admin" });
      value = da.toString();
      cache.set(key, value);
    } catch {
      return {};
    }
  }
  return { "data-sanity": value };
}