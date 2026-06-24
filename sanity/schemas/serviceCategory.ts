// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, orderField } from "../lib/schema-master";

export default defineType({
  name: "serviceCategory", title: "Categoria de Servicio", type: "document", icon: () => "📂",
  fields: [
    titleField("Nombre de la Categoria"),
    slugField("name"),
    defineField({ name: "description", title: "Descripcion", type: "text", rows: 2 }),
    defineField({ name: "icon", title: "Icono", type: "string", description: "Nombre del icono Lucide. Ej: heart, truck, star, shield-check" }),
    defineField({ name: "color", title: "Color", type: "string", description: "Color hex. Ej: #006c83" }),
    orderField(),
  ],
  preview: { select: { title: "name", color: "color" }, prepare({ title, color }) { return { title: title || "Sin nombre", subtitle: color || "" }; } },
});