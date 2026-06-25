import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineDocuments, defineLocations } from "sanity/presentation";
import { schemaTypes } from "./sanity/schema";
import { STUDIO_TITLE } from "./sanity/lib/constants";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/**
 * Site URL — NEVER falls back to localhost.
 *
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (explicit, recommended for Vercel)
 * 2. VERCEL_URL (auto-set by Vercel during builds)
 * 3. Hardcoded production URL (maia-store.vercel.app)
 */
function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  // Production hardcoded fallback — never localhost
  return "https://maia-store.vercel.app";
}

const siteUrl = getSiteUrl();

export default defineConfig({
  name: "maia-store-cms",
  title: STUDIO_TITLE,
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      name: "presentation",
      title: "Vista Previa",
      previewUrl: {
        initial: siteUrl,
        previewMode: {
          enable: "/api/preview",
        },
      },
      resolve: {
        /**
         * mainDocuments — maps URL routes to Sanity documents.
         * When the user navigates in the preview iframe,
         * this tells the Studio which document is being viewed.
         */
        mainDocuments: defineDocuments([
          {
            route: "/",
            type: "siteSettings",
          },
          {
            route: "/",
            type: "heroSlide",
          },
          {
            route: "/nosotros",
            type: "teamMember",
          },
          {
            route: "/coleccion",
            type: "serviceCategory",
          },
          {
            route: "/coleccion/:slug",
            filter: ({ params }) =>
              `_type == "project" && slug.current == "${params.slug}"`,
          },
          {
            route: "/coleccion",
            type: "service",
          },
        ]),

        /**
         * locations — maps Sanity documents to frontend URLs.
         * When a user clicks on a document in the Studio,
         * this tells the Presentation Tool which page to navigate to.
         * Also used by the Document Inspector overlay.
         */
        locations: {
          siteSettings: defineLocations({
            select: { title: "title" },
            resolve: () => ({
              locations: [{ title: "Inicio", href: "/" }],
            }),
          }),
          heroSlide: defineLocations({
            select: { title: "title" },
            resolve: () => ({
              locations: [{ title: "Inicio — Hero", href: "/" }],
            }),
          }),
          stat: defineLocations({
            select: { label: "label" },
            resolve: () => ({
              locations: [{ title: "Inicio — Estadísticas", href: "/" }],
            }),
          }),
          partner: defineLocations({
            select: { name: "name" },
            resolve: () => ({
              locations: [{ title: "Inicio — Socios", href: "/" }],
            }),
          }),
          testimonial: defineLocations({
            select: { authorName: "authorName" },
            resolve: () => ({
              locations: [{ title: "Inicio — Testimonios", href: "/" }],
            }),
          }),
          teamMember: defineLocations({
            select: { name: "name", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [{ title: `Nosotros — ${doc?.name || "Equipo"}`, href: "/nosotros" }],
            }),
          }),
          serviceCategory: defineLocations({
            select: { name: "name", slug: "slug.current" },
            resolve: (doc) => {
              if (!doc?.slug) {
                return { locations: [{ title: "Colecciones", href: "/coleccion" }] };
              }
              return {
                locations: [
                  { title: `Colección — ${doc.name || doc.slug}`, href: `/coleccion?categoria=${doc.slug}` },
                ],
              };
            },
          }),
          service: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => {
              if (!doc?.slug) {
                return { locations: [{ title: "Colecciones", href: "/coleccion" }] };
              }
              return {
                locations: [
                  { title: `Servicio — ${doc.title || doc.slug}`, href: `/coleccion?categoria=${doc.slug}` },
                ],
              };
            },
          }),
          project: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => {
              if (!doc?.slug) {
                return { message: "Este producto no tiene slug", tone: "caution" as const };
              }
              return {
                locations: [
                  { title: `Producto — ${doc.title || doc.slug}`, href: `/coleccion/${doc.slug}` },
                ],
              };
            },
          }),
          studioGuide: defineLocations({
            select: { title: "title" },
            resolve: () => ({
              locations: [{ title: "CMS", href: "/admin" }],
            }),
          }),
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});