// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "howToBuyPage",
  title: "Cómo Comprar",
  type: "document",
  icon: () => "🛍️",
  fields: [
    defineField({
      name: "title",
      title: "Título de la Página",
      type: "string",
      initialValue: "Cómo Comprar",
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      initialValue: "Tu joya perfecta está a unos pasos",
    }),
    defineField({
      name: "steps",
      title: "Pasos para Comprar",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "stepNumber", title: "Número de Paso", type: "number" },
            { name: "icon", title: "Icono (emoji)", type: "string" },
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title", subtitle: "stepNumber" },
          },
        },
      ],
    }),
    defineField({
      name: "paymentMethods",
      title: "Métodos de Pago",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nombre", type: "string" },
            { name: "description", title: "Descripción", type: "string" },
            { name: "icon", title: "Icono (emoji)", type: "string" },
          ],
          preview: {
            select: { title: "name", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "shippingInfo",
      title: "Información de Envío",
      type: "text",
      rows: 4,
      description: "Detalles sobre envíos y entregas",
    }),
    defineField({
      name: "whatsappNumber",
      title: "Número de WhatsApp para consultas",
      type: "string",
      description: "Ej: 51977333858",
    }),
    defineField({
      name: "whatsappMessage",
      title: "Mensaje por defecto de WhatsApp",
      type: "string",
      initialValue: "Hola Maia Store! Quisiera información sobre cómo comprar",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página Cómo Comprar", subtitle: "Pasos, pagos y envíos" };
    },
  },
});
