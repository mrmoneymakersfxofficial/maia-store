// @ts-nocheck
import { defineType, defineField } from "sanity";

export default defineType({
  name: "studioGuide", title: "Guia de Uso", type: "document",
  fields: [
    defineField({ name: "title", title: "Titulo", type: "string", initialValue: "Guia Paso a Paso" }),
    defineField({ name: "content", title: "Contenido", type: "array", of: [{ type: "block" }], initialValue: [
      { _type: "block", _key: "g1", children: [{ _type: "span", _key: "s1", text: "Bienvenido al CMS de Maia Store." }], style: "h2" },
      { _type: "block", _key: "g2", children: [{ _type: "span", _key: "s2", text: "Usa el panel izquierdo para navegar entre secciones." }], style: "normal" },
      { _type: "block", _key: "g3", children: [{ _type: "span", _key: "s3", text: "Para subir imagenes, haz clic en el campo de imagen y arrastra o selecciona un archivo." }], style: "normal" },
      { _type: "block", _key: "g4", children: [{ _type: "span", _key: "s4", text: "Los cambios se publican cuando presionas el boton 'Publicar'." }], style: "normal" },
    ] }),
  ],
  preview: { prepare() { return { title: "Guia de Uso" }; } },
});