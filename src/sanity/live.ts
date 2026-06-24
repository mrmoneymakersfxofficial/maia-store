// @ts-nocheck
import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const { sanityFetch, SanityLive } = projectId
  ? defineLive({
      client: createClient({
        projectId, dataset, apiVersion: "2025-01-01", useCdn: true,
        perspective: "published",
        stega: { enabled: true, studioUrl: "/admin" },
      }),
      serverToken: process.env.SANITY_API_READ_TOKEN,
      browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
    })
  : { sanityFetch: async () => ({ data: null, sourceMap: null, tags: [] }), SanityLive: () => null };