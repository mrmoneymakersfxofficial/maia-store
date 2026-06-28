// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configuración del Sitio",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({ name: "companyName", title: "Nombre de la Tienda", type: "string", initialValue: "Maia Store" }),
    defineField({ name: "slogan", title: "Slogan", type: "string", description: "Ej: Joyas Tejidas a Mano" }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "logoWhite", title: "Logo Blanco", type: "image", options: { hotspot: true }, description: "Logo para fondos oscuros" }),
    defineField({ name: "ogImage", title: "OG Image (Compartir)", type: "image", options: { hotspot: true }, description: "Imagen para redes sociales (1200x630 o 1200x1200)" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string", description: "Número con código de país, sin +. Ej: 51977333858" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url" }),
    defineField({ name: "tiktokUrl", title: "TikTok", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook", type: "url" }),
    defineField({
      name: "heroSlides",
      title: "Slides del Hero",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "title", title: "Título", type: "string" },
          { name: "subtitle", title: "Subtítulo", type: "string" },
          { name: "image", title: "Imagen", type: "image", options: { hotspot: true } },
          { name: "ctaLabel", title: "Texto del Botón", type: "string" },
          { name: "ctaLink", title: "Enlace del Botón", type: "string" },
        ],
      }],
      description: "Imágenes y textos del carrusel principal",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonios",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "Nombre", type: "string" },
          { name: "location", title: "Ubicación", type: "string" },
          { name: "text", title: "Texto", type: "text", rows: 3 },
          { name: "rating", title: "Calificación", type: "number", validation: (Rule) => Rule.min(1).max(5) },
          { name: "photo", title: "Foto", type: "image", options: { hotspot: true } },
        ],
      }],
    }),
    defineField({ name: "seoTitle", title: "SEO Título", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Descripción", type: "text", rows: 3, description: "Máximo 160 caracteres" }),
  ],
});