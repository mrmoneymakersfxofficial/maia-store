// @ts-nocheck
import { defineType, defineField } from "sanity";
import { orderField, featuredField } from "../lib/schema-master";

export default defineType({
  name: "testimonial", title: "Testimonio", type: "document", icon: () => "💬",
  fields: [
    defineField({ name: "authorName", title: "Nombre del Autor", type: "string", validation: (R: any) => R.required().max(100) }),
    defineField({ name: "authorRole", title: "Cargo / Ocupacion", type: "string" }),
    defineField({ name: "company", title: "Ciudad / Ubicacion", type: "string" }),
    defineField({ name: "quote", title: "Testimonio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "photo", title: "Foto del Autor", type: "image", options: { hotspot: true } }),
    defineField({ name: "rating", title: "Calificacion", type: "number", validation: (R: any) => R.min(1).max(5), initialValue: 5 }),
    defineField({ name: "project", title: "Producto Relacionado", type: "reference", to: [{ type: "project" }] }),
    featuredField("Testimonio Destacado", "Activa para mostrarlo en secciones principales"),
    orderField(),
  ],
  preview: { select: { title: "authorName", subtitle: "company", media: "photo" } },
});