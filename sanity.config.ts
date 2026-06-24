import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schema";
import { STUDIO_TITLE } from "./sanity/lib/constants";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "maia-store-cms",
  title: STUDIO_TITLE,
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      name: "presentation",
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        preview: "/api/preview",
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});