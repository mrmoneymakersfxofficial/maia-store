// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contacto",
  type: "document",
  icon: () => "📬",
  fields: [
    defineField({
      name: "title",
      title: "Título de la Sección",
      type: "string",
      initialValue: "Contacto",
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      initialValue: "Lo que Dicen Nuestras Clientas",
    }),
    defineField({
      name: "contactInfo",
      title: "Información de Contacto",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Etiqueta", type: "string" },
            { name: "value", title: "Valor", type: "string" },
            { name: "icon", title: "Icono (emoji)", type: "string" },
            { name: "url", title: "URL (opcional)", type: "url" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "ctaTitle",
      title: "Título del CTA (Banner)",
      type: "string",
      initialValue: "¿Lista para Brillar?",
    }),
    defineField({
      name: "ctaDescription",
      title: "Descripción del CTA",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaImage",
      title: "Imagen del CTA",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaButtons",
      title: "Botones del CTA",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Texto del Botón", type: "string" },
            { name: "url", title: "URL", type: "url" },
            { name: "type", title: "Tipo", type: "string", options: { list: [
              { title: "Primario", value: "primary" },
              { title: "Secundario", value: "secondary" },
            ]}},
          ],
          preview: {
            select: { title: "label", subtitle: "type" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página Contacto", subtitle: "Contenido de la sección Contacto" };
    },
  },
});
