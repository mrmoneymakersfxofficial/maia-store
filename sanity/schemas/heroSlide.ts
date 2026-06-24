// @ts-nocheck
import { defineType, defineField } from "sanity";
import { orderField } from "../lib/schema-master";

export default defineType({
  name: "heroSlide", title: "Slide del Hero", type: "document", icon: () => "🖼️",
  fields: [
    defineField({ name: "title", title: "Titulo", type: "string", validation: (R: any) => R.required().max(100) }),
    defineField({ name: "subtitle", title: "Subtitulo", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "backgroundImage", title: "Imagen de Fondo", type: "image", options: { hotspot: true } }),
    defineField({ name: "backgroundVideoMp4", title: "Video de Fondo (MP4)", type: "file", options: { accept: "video/mp4" } }),
    defineField({ name: "backgroundVideoWebm", title: "Video de Fondo (WebM)", type: "file", options: { accept: "video/webm" } }),
    defineField({ name: "posterImage", title: "Imagen Poster", type: "image", options: { hotspot: true } }),
    defineField({ name: "mobileFallbackImage", title: "Imagen Movil (Fallback)", type: "image", options: { hotspot: true } }),
    defineField({ name: "videoAutoplay", title: "Autoplay del Video", type: "boolean", initialValue: true }),
    defineField({ name: "videoMuted", title: "Video Silenciado", type: "boolean", initialValue: true }),
    defineField({ name: "videoLoop", title: "Video en Loop", type: "boolean", initialValue: true }),
    defineField({ name: "ctaLabel", title: "Etiqueta del CTA", type: "string", validation: (R: any) => R.max(30).optional() }),
    defineField({ name: "ctaLink", title: "Enlace del CTA", type: "string", validation: (R: any) => R.max(200).optional() }),
    defineField({ name: "ctaType", title: "Tipo de CTA", type: "string", options: { list: [
      { title: "Primario", value: "primary" },
      { title: "Secundario", value: "secondary" },
      { title: "WhatsApp", value: "whatsapp" },
      { title: "Email", value: "mail" },
    ], layout: "radio" }, initialValue: "primary" }),
    orderField(),
  ],
  preview: { select: { title: "title", media: "backgroundImage" }, prepare({ title, media }) { return { title: title || "Sin titulo", media }; } },
});