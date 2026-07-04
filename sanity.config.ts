import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
import { schemaTypes } from "./sanity/schema";
import { STUDIO_TITLE } from "./sanity/lib/constants";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

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
          S.listItem().title("Inicio").icon(() => "\u{1F3E0}").id("home-group").child(
            S.list().title("Inicio").items([
              S.listItem().title("Hero (Slides)").icon(() => "\u{1F4CA}").id("hero-slides").child(
                S.documentTypeList("heroSlide").title("Slides del Hero").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Testimonios").icon(() => "\u{1F4AC}").id("testimonials-list").child(
                S.documentTypeList("testimonial").title("Testimonios").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Datos del Sitio").icon(() => "\u2699\uFE0F").id("site-settings-editor").child(
                S.document().schemaType("siteSettings").documentId("siteSettings").title("Configuraci\u00F3n"),
              ),
            ]),
          ),
          S.listItem().title("Productos").icon(() => "\u{1F3F7}\uFE0F").id("products-group").child(
            S.list().title("Productos").items([
              S.listItem().title("Categor\u00EDas").icon(() => "\u{1F4C2}").id("product-categories-list").child(
                S.documentTypeList("productCategory").title("Categor\u00EDas").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              ...S.documentTypeListItems().filter((item) => item.getId() === "product"),
            ]),
          ),
          S.listItem().title("Configuraci\u00F3n").icon(() => "\u2699\uFE0F").id("settings-group").child(
            S.document().schemaType("siteSettings").documentId("siteSettings").title("Configuraci\u00F3n del Sitio"),
          ),
          S.listItem().title("Gu\u00EDa de Uso").icon(() => "\u{1F4D6}").id("guide-group").child(
            S.document().schemaType("studioGuide").documentId("studio-guide").title("Gu\u00EDa Paso a Paso"),
          ),
        ]);
      },
    }),
    presentationTool({
      name: "presentation",
      title: "Vista Previa",
      previewUrl: {
        initial: siteUrl,
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: {
        locations: {
          siteSettings: defineLocations({
            select: {},
            resolve: () => ({
              locations: [
                { title: "Inicio", href: "/" },
                { title: "Contacto", href: "/contacto" },
              ],
            }),
          }),
          heroSlide: defineLocations({
            select: {},
            resolve: () => ({
              locations: [{ title: "Hero", href: "/#inicio" }],
            }),
          }),
          testimonial: defineLocations({
            select: {},
            resolve: () => ({
              locations: [{ title: "Testimonios", href: "/#testimonios" }],
            }),
          }),
          product: defineLocations({
            select: {
              name: "name",
              slug: "slug.current",
            },
            resolve: (doc: any) => {
              if (!doc?.slug) return { message: "Producto sin slug", tone: "caution" as const };
              return { locations: [{ title: `Producto \u2014 ${doc.name || doc.slug}`, href: `/coleccion/${doc.slug}` }] };
            },
          }),
          productCategory: defineLocations({
            select: {
              name: "name",
              slug: "slug.current",
            },
            resolve: (doc: any) => {
              if (!doc?.slug) return { locations: [{ title: "Colecci\u00F3n", href: "/coleccion" }] };
              return { locations: [{ title: `Categor\u00EDa \u2014 ${doc.name || doc.slug}`, href: `/coleccion?categoria=${doc.slug}` }] };
            },
          }),
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});