// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "Nosotros",
  type: "document",
  icon: () => "👩‍🎨",
  fields: [
    defineField({
      name: "title",
      title: "Título de la Sección",
      type: "string",
      initialValue: "Nuestra Historia",
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      initialValue: "Artesanía que Transforma",
    }),
    defineField({
      name: "mainImage",
      title: "Imagen Principal",
      type: "image",
      options: { hotspot: true },
      description: "Imagen de la artesana (1200x1500px recomendado)",
    }),
    defineField({
      name: "storyParagraphs",
      title: "Párrafos de la Historia",
      type: "array",
      of: [{ type: "block" }],
      description: "La historia de Maia Store",
    }),
    defineField({
      name: "features",
      title: "Características / Pilares",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icono (emoji)", type: "string", initialValue: "💎" },
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "icon" },
          },
        },
      ],
    }),
    defineField({
      name: "yearsExperience",
      title: "Años de Experiencia",
      type: "number",
      initialValue: 5,
    }),
    defineField({
      name: "experienceLabel",
      title: "Etiqueta de Experiencia",
      type: "string",
      initialValue: "Años de Experiencia",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página Nosotros", subtitle: "Contenido de la sección About" };
    },
  },
});
