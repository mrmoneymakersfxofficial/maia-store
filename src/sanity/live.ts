import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";

export const { sanityFetch } = defineLive({
  client: createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2025-01-01",
    useCdn: false,
    perspective: "previewDrafts",
    token: process.env.SANITY_API_READ_TOKEN,
    stega: { enabled: true, studioUrl: "/admin" },
  }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
});
