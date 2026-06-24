// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, imageField, descriptionField, orderField, featuredField, statusField, categoryReferenceField } from "../lib/schema-master";

export default defineType({
  name: "project", title: "Proyecto / Coleccion", type: "document", icon: () => "🎨",
  fields: [
    titleField("Titulo del Proyecto"),
    slugField("title"),
    defineField({ ...imageField("Imagen de Portada", true), name: "coverImage", title: "Imagen de Portada", description: "Se recomienda 1200x800px" }),
    defineField({ name: "gallery", title: "Galeria", type: "array", of: [{ type: "image", options: { hotspot: true } }], description: "Imagenes adicionales del proyecto" }),
    descriptionField("Descripcion Completa"),
    defineField({ name: "excerpt", title: "Resumen Corto", type: "text", rows: 2, description: "Breve descripcion para tarjetas. Maximo 200 caracteres.", validation: (R: any) => R.max(200) }),
    defineField({ name: "client", title: "Cliente", type: "string" }),
    defineField({ name: "location", title: "Ubicacion", type: "string" }),
    defineField({ name: "year", title: "Ano", type: "string" }),
    defineField({ name: "area", title: "Area", type: "string", description: 'Ej: "Pulseras", "Collares", "Aretes"' }),
    statusField(),
    defineField({ name: "tags", title: "Etiquetas", type: "array", of: [{ type: "string" }], description: "Tags para filtrado" }),
    defineField({ name: "service", title: "Servicio Relacionado", type: "reference", to: [{ type: "service" }] }),
    featuredField("Proyecto Destacado", "Activa para mostrarlo en la seccion principal"),
    orderField(),
  ],
  preview: { select: { title: "title", media: "coverImage", status: "status" }, prepare({ title, media, status }) { return { title, media, subtitle: status === "available" ? "Disponible" : status === "sold-out" ? "Agotado" : "Proximamente" }; } },
});