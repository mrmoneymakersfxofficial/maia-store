// @ts-nocheck
import { defineField, defineType } from "sanity";
import { titleField, slugField, imageField, descriptionField, orderField, featuredField, categoryReferenceField } from "../lib/schema-master";

export default defineType({
  name: "service", title: "Servicio / Valor", type: "document", icon: () => "💎",
  fieldsets: [
    { name: "info", title: "Informacion Principal", description: "Titulo, imagen, categoria y descripcion.", options: { collapsible: false } },
    { name: "detail", title: "Detalles / Caracteristicas", description: "Lista de detalles o caracteristicas.", options: { collapsible: true, collapsed: false } },
    { name: "display", title: "Visualizacion", description: "Control de como se muestra.", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    titleField("Nombre del Servicio"),
    slugField("title"),
    categoryReferenceField("serviceCategory", "Categoria de Servicio"),
    defineField({ ...imageField("Imagen de Portada", true), name: "coverImage", title: "Imagen de Portada", description: "Imagen panoramica. Se recomienda 1400x600px." }),
    descriptionField("Descripcion del Servicio"),
    defineField({
      name: "subservices", title: "Detalles / Caracteristicas", fieldset: "detail",
      description: "Lista de detalles, beneficios o areas incluidas.",
      type: "array",
      of: [{ type: "object", title: "Detalle", fields: [
        { name: "title", title: "Nombre del Detalle", type: "string", validation: (Rule: any) => Rule.required().max(80) },
        { name: "description", title: "Descripcion Corta", type: "text", rows: 2, validation: (Rule: any) => Rule.max(200).optional() },
        { name: "image", title: "Imagen del Detalle", type: "image", options: { hotspot: true } },
      ], preview: { select: { title: "title", subtitle: "description", media: "image" } } }],
      validation: (Rule) => Rule.max(12).error("Maximo 12 detalles por servicio."),
    }),
    featuredField("Servicio Destacado", "Activa para mostrarlo en secciones principales del sitio."),
    orderField(),
  ],
  preview: { select: { title: "title", category: "category.name", media: "coverImage", featured: "featured" }, prepare({ title, category, media, featured }) { return { title: featured ? `⭐ ${title}` : title, subtitle: category || "Sin categoria", media }; } },
});