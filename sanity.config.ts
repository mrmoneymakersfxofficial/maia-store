import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
// Icons via emoji functions — avoids non-existent @sanity/icons exports
import { schemaTypes } from "./sanity/schema";
import { STUDIO_TITLE } from "./sanity/lib/constants";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/**
 * Site URL — NEVER falls back to localhost.
 */
function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://maia-store.vercel.app";
}

const siteUrl = getSiteUrl();

export default defineConfig({
  name: "maia-store-cms",
  title: STUDIO_TITLE,
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) => {
        return S.list().title("Panel de Control").items([
          S.listItem().title("Inicio").icon(() => "🏠").id("home-group").child(
            S.list().title("Inicio").items([
              S.listItem().title("Hero (Slides)").icon(() => "📊").id("hero-slides").child(
                S.documentTypeList("heroSlide").title("Slides del Hero").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Testimonios").icon(() => "💬").id("testimonials-list").child(
                S.documentTypeList("testimonial").title("Testimonios").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Datos del Sitio").icon(() => "⚙️").id("site-settings-editor").child(
                S.document().schemaType("siteSettings").documentId("siteSettings").title("Configuración"),
              ),
            ]),
          ),
          S.listItem().title("Productos").icon(() => "🏷️").id("products-group").child(
            S.list().title("Productos").items([
              S.listItem().title("Categorías").icon(() => "📂").id("product-categories-list").child(
                S.documentTypeList("productCategory").title("Categorías").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              ...S.documentTypeListItems().filter((item) => item.getId() === "product"),
            ]),
          ),
          S.listItem().title("Configuración").icon(() => "⚙️").id("settings-group").child(
            S.document().schemaType("siteSettings").documentId("siteSettings").title("Configuración del Sitio"),
          ),
          S.listItem().title("Guía de Uso").icon(() => "📖").id("guide-group").child(
            S.document().schemaType("studioGuide").documentId("studio-guide").title("Guía Paso a Paso"),
          ),
        ]);
      },
    }),
    presentationTool({
      previewUrl: {
        initial: siteUrl,
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: {
        locations: {
          siteSettings: defineLocations({
            type: "siteSettings",
            resolve: () => ({
              locations: [
                { title: "Inicio", href: "/" },
                { title: "Contacto", href: "/contacto" },
              ],
            }),
          }),
          heroSlide: defineLocations({
            type: "heroSlide",
            resolve: () => ({
              locations: [{ title: "Hero", href: "/#inicio" }],
            }),
          }),
          testimonial: defineLocations({
            type: "testimonial",
            resolve: () => ({
              locations: [{ title: "Testimonios", href: "/#testimonios" }],
            }),
          }),
          product: defineLocations({
            type: "product",
            resolve: (doc) => {
              if (!doc?.slug) return { message: "Producto sin slug", tone: "caution" as const };
              return { locations: [{ title: `Producto — ${doc.name || doc.slug}`, href: `/coleccion/${doc.slug}` }] };
            },
          }),
          productCategory: defineLocations({
            type: "productCategory",
            resolve: (doc) => {
              if (!doc?.slug) return { locations: [{ title: "Colección", href: "/coleccion" }] };
              return { locations: [{ title: `Categoría — ${doc.name || doc.slug}`, href: `/coleccion?categoria=${doc.slug}` }] };
            },
          }),
        },
      },
    }),,
  ].filter(Boolean),
  schema: {
    types: schemaTypes,
  },
});
