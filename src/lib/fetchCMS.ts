import { draftMode } from "next/headers";
import { getClientForDraft } from "@/lib/sanity.client";

export async function fetchCMS<T>(query: string): Promise<T | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
    let isDraft = false;
    try { const dm = await draftMode(); isDraft = dm.isEnabled; } catch {}
    const client = getClientForDraft(isDraft);
    if (!client) return null;
    const data = await client.fetch<T>(query);
    return data ?? null;
  } catch (error) { console.warn("[CMS] Fetch failed, using fallback:", error); return null; }
}