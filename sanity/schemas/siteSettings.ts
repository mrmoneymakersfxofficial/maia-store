// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings", title: "Configuracion del Sitio", type: "document", icon: () => "⚙️",
  fields: [
    defineField({ name: "companyName", title: "Nombre de la Empresa", type: "string" }),
    defineField({ name: "slogan", title: "Slogan", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "logoWhite", title: "Logo Blanco", type: "image", options: { hotspot: true }, description: "Logo para fondos oscuros" }),
    defineField({ name: "ogImage", title: "OG Image", type: "image", options: { hotspot: true }, description: "Imagen para compartir en redes sociales (1200x630)" }),
    defineField({ name: "phone", title: "Telefono", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string", description: "Numero con codigo de pais, sin +. Ej: 51977333858" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Direccion", type: "string" }),
    defineField({ name: "businessHours", title: "Horario", type: "string" }),
    defineField({ name: "facebookUrl", title: "Facebook", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url" }),
    defineField({ name: "tiktokUrl", title: "TikTok", type: "url" }),
    defineField({ name: "youtubeUrl", title: "YouTube", type: "url" }),
    defineField({ name: "mapLatitude", title: "Latitud del Mapa", type: "number" }),
    defineField({ name: "mapLongitude", title: "Longitud del Mapa", type: "number" }),
    defineField({ name: "mapZoom", title: "Zoom del Mapa", type: "number", initialValue: 15 }),
    defineField({ name: "seoTitle", title: "SEO Titulo", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Descripcion", type: "text", rows: 3, description: "Maximo 160 caracteres" }),
  ],
});