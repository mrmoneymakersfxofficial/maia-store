// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "productCategory",
  title: "Categoría de Producto",
  type: "document",
  icon: () => "🏷️",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
      description: "Descripción breve de la categoría",
    }),
    defineField({
      name: "image",
      title: "Imagen de Categoría",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
      description: "Orden de aparición (menor = primero)",
    }),
    defineField({
      name: "featured",
      title: "Destacada",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "description", media: "image" },
  },
  orderings: [
    { title: "Orden", by: [{ field: "order", direction: "asc" }] },
    { title: "Nombre A-Z", by: [{ field: "name", direction: "asc" }] },
  ],
});