import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineDocuments, defineLocations } from "sanity/presentation";
import {
  CogIcon, BookIcon, HomeIcon,
  StackIcon, TagIcon, ChatBubbleIcon,
} from "@sanity/icons";
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
          // ─── INICIO ────────────────────────────
          S.listItem().title("Inicio").icon(HomeIcon).id("home-group").child(
            S.list().title("Inicio").items([
              S.listItem().title("Hero (Slides)").icon(StackIcon).id("hero-slides").child(
                S.documentTypeList("heroSlide").title("Slides del Hero").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Testimonios").icon(ChatBubbleIcon).id("testimonials-list").child(
                S.documentTypeList("testimonial").title("Testimonios").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              S.listItem().title("Datos del Sitio").icon(CogIcon).id("site-settings-editor").child(
                S.document().schemaType("siteSettings").documentId("siteSettings").title("Configuración"),
              ),
            ]),
          ),
          // ─── PRODUCTOS ─────────────────────────
          S.listItem().title("Productos").icon(TagIcon).id("products-group").child(
            S.list().title("Productos").items([
              S.listItem().title("Categorías").icon(TagIcon).id("product-categories-list").child(
                S.documentTypeList("productCategory").title("Categorías").defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
              ...S.documentTypeListItems().filter((item) => item.getId() === "product"),
            ]),
          ),
          // ─── CONFIGURACIÓN ─────────────────────
          S.listItem().title("Configuración").icon(CogIcon).id("settings-group").child(
            S.document().schemaType("siteSettings").documentId("siteSettings").title("Configuración del Sitio"),
          ),
          // ─── GUÍA ──────────────────────────────
          S.listItem().title("Guía de Uso").icon(BookIcon).id("guide-group").child(
            S.document().schemaType("studioGuide").documentId("studio-guide").title("Guía Paso a Paso"),
          ),
        ]);
      },
    }),
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
            route: "/",
            type: "testimonial",
          },
          {
            route: "/coleccion",
            type: "productCategory",
          },
          {
            route: "/coleccion/:slug",
            type: "product",
            filter: ({ params }) =>
              `_type == "product" && slug.current == "${params.slug}"`,
          },
        ]),
        locations: {
          siteSettings: defineLocations({
            select: { title: "companyName" },
            resolve: () => ({
              locations: [
                { title: "Inicio", href: "/" },
                { title: "Contacto", href: "/contacto" },
              ],
            }),
          }),
          heroSlide: defineLocations({
            select: { title: "title" },
            resolve: () => ({
              locations: [{ title: "Inicio — Hero", href: "/" }],
            }),
          }),
          testimonial: defineLocations({
            select: { authorName: "authorName" },
            resolve: () => ({
              locations: [{ title: "Inicio — Testimonios", href: "/" }],
            }),
          }),
          productCategory: defineLocations({
            select: { name: "name", slug: "slug.current" },
            resolve: (doc) => {
              if (!doc?.slug) {
                return { locations: [{ title: "Colección", href: "/coleccion" }] };
              }
              return {
                locations: [
                  { title: `Categoría — ${doc.name || doc.slug}`, href: `/coleccion?categoria=${doc.slug}` },
                ],
              };
            },
          }),
          product: defineLocations({
            select: { name: "name", slug: "slug.current" },
            resolve: (doc) => {
              if (!doc?.slug) {
                return { message: "Este producto no tiene slug", tone: "caution" as const };
              }
              return {
                locations: [
                  { title: `Producto — ${doc.name || doc.slug}`, href: `/coleccion/${doc.slug}` },
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