// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "footerSettings",
  title: "Footer (Pie de Página)",
  type: "document",
  icon: () => "📋",
  fields: [
    defineField({
      name: "copyright",
      title: "Texto de Copyright",
      type: "string",
      initialValue: "Maia Store. Todos los derechos reservados.",
      description: "El año se agrega automáticamente",
    }),
    defineField({
      name: "brandDescription",
      title: "Descripción de la Marca",
      type: "text",
      rows: 3,
      description: "Texto breve sobre Maia Store para el footer",
    }),
    defineField({
      name: "socialLinks",
      title: "Redes Sociales",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Plataforma", type: "string", options: {
              list: [
                { title: "Instagram", value: "instagram" },
                { title: "TikTok", value: "tiktok" },
                { title: "Facebook", value: "facebook" },
                { title: "WhatsApp", value: "whatsapp" },
                { title: "Email", value: "email" },
              ],
            }},
            { name: "label", title: "Etiqueta", type: "string" },
            { name: "handle", title: "Usuario / Handle", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
          preview: {
            select: { title: "platform", subtitle: "handle" },
          },
        },
      ],
    }),
    defineField({
      name: "quickLinks",
      title: "Enlaces Rápidos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Texto", type: "string" },
            { name: "href", title: "URL", type: "string" },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "newsletterText",
      title: "Texto del Newsletter",
      type: "string",
      initialValue: "Suscríbete para recibir novedades y ofertas exclusivas",
    }),
    defineField({
      name: "showTrustBadges",
      title: "Mostrar Sellos de Confianza",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer Settings", subtitle: "Configuración del pie de página" };
    },
  },
});
