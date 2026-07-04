import { createClient } from "next-sanity";
import { defineLive, type DefinedFetchType } from "next-sanity/live";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

type FetchFn = <T = unknown>(opts: { query: string; params?: Record<string, unknown> }) => Promise<{ data: T; sourceMap: unknown; tags: string[] }>;

const noopFetch: FetchFn = async <T = unknown>(_opts: { query: string; params?: Record<string, unknown> }): Promise<{ data: T; sourceMap: unknown; tags: string[] }> => {
  return { data: [] as unknown as T, sourceMap: null, tags: [] };
};

export const { sanityFetch } = projectId
  ? defineLive({
      client: createClient({
        projectId,
        dataset,
        apiVersion: "2025-01-01",
        useCdn: false,
        perspective: "previewDrafts",
        token: process.env.SANITY_API_READ_TOKEN,
        stega: { enabled: true, studioUrl: "/admin" },
      }),
      serverToken: process.env.SANITY_API_READ_TOKEN,
      browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
    })
  : { sanityFetch: noopFetch as unknown as DefinedFetchType };