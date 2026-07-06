// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Producto (Joya)",
  type: "document",
  icon: () => "💎",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del Producto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      description: "Código único del producto",
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Colección",
      type: "string",
      description: "Nombre de la colección (ej: Juego Botón)",
    }),
    defineField({
      name: "price",
      title: "Precio (S/)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Precio Comparación (S/)",
      type: "number",
      description: "Precio tachado (antes)",
    }),
    defineField({
      name: "description",
      title: "Descripción Corta",
      type: "text",
      rows: 3,
      description: "Usada en tarjetas y listas",
    }),
    defineField({
      name: "longDescription",
      title: "Descripción Larga",
      type: "array",
      of: [{ type: "block" }],
      description: "Descripción completa para la página de detalle",
    }),
    defineField({
      name: "features",
      title: "Características",
      type: "array",
      of: [{ type: "string" }],
      description: "Lista de características del producto",
    }),
    defineField({
      name: "mainImage",
      title: "Imagen Principal",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImageUrl",
      title: "URL Imagen Principal (fallback)",
      type: "url",
      description: "URL directa para cuando no hay asset subido a Sanity",
    }),
    defineField({
      name: "secondaryImage",
      title: "Imagen Secundaria (hover)",
      type: "image",
      options: { hotspot: true },
      description: "Se muestra al pasar el ratón sobre la tarjeta",
    }),
    defineField({
      name: "secondaryImageUrl",
      title: "URL Imagen Secundaria (fallback)",
      type: "url",
      description: "URL directa para cuando no hay asset subido a Sanity",
    }),
    defineField({
      name: "gallery",
      title: "Galería de Imágenes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Imagen", type: "image", options: { hotspot: true } },
            { name: "alt", title: "Texto Alternativo", type: "string" },
            { name: "url", title: "URL directa (fallback)", type: "url" },
          ],
          preview: { select: { media: "image", title: "alt" } },
        },
      ],
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Nombre del color (ej: Crema, Rosado)",
    }),
    defineField({
      name: "size",
      title: "Tamaño (mm)",
      type: "number",
    }),
    defineField({
      name: "materials",
      title: "Materiales",
      type: "array",
      of: [{ type: "string" }],
      description: "ej: Hilo premium, Plata 925, Swarovski",
    }),
    defineField({
      name: "rating",
      title: "Calificación",
      type: "number",
      initialValue: 5.0,
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Cantidad de Reseñas",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "inStock",
      title: "En Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Título",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Descripción",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "sku",
      media: "mainImage",
      category: "category.name",
    },
    prepare({ title, subtitle, media, category }) {
      return {
        title: `[${category || "Sin categoría"}] ${title || "Sin nombre"}`,
        subtitle: subtitle || "",
        media,
      };
    },
  },
  orderings: [
    { title: "Orden", by: [{ field: "order", direction: "asc" }] },
    { title: "Nombre A-Z", by: [{ field: "name", direction: "asc" }] },
    { title: "Precio menor", by: [{ field: "price", direction: "asc" }] },
    { title: "Precio mayor", by: [{ field: "price", direction: "desc" }] },
    { title: "Más recientes", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
});