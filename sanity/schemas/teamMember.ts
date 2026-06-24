// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, imageField, descriptionField, orderField } from "../lib/schema-master";

export default defineType({
  name: "teamMember", title: "Miembro del Equipo / Artesana", type: "document", icon: () => "👩‍🎨",
  fields: [
    titleField("Nombre Completo"),
    slugField("name"),
    defineField({ name: "role", title: "Rol / Especialidad", type: "string", validation: (R: any) => R.required(), description: "Ej: Artesana Principal, Disenadora de Joyas" }),
    defineField({ name: "department", title: "Departamento", type: "string", description: "Ej: Tejido, Diseno, Quality Control" }),
    defineField({ ...imageField("Foto"), name: "photo", title: "Foto", description: "Se recomienda 400x400px" }),
    descriptionField("Biografia"),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Telefono", type: "string" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url" }),
    orderField(),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});