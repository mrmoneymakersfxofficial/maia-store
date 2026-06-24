// @ts-nocheck
import { defineType, defineField } from "sanity";
import { orderField } from "../lib/schema-master";

export default defineType({
  name: "partner", title: "Socio / Aliado", type: "document", icon: () => "🤝",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (R: any) => R.required().max(100) }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "url", title: "URL", type: "url" }),
    orderField(),
  ],
  preview: { select: { title: "name", media: "logo" }, prepare({ title, media }) { return { title: title || "Sin nombre", media }; } },
});