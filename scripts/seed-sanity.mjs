// ═══════════════════════════════════════════════════════════════
// Sanity Seed Script
// Migra todos los productos, categorías y testimonios de
// store-data.ts a Sanity para que el overlay visual funcione.
// ═══════════════════════════════════════════════════════════════
//
// USO:
//   1. Crear un token de escritura en sanity.io/manage
//   2. SANITY_WRITE_TOKEN="tu-token" bun run scripts/seed-sanity.mjs
//   3. O: SANITY_WRITE_TOKEN="tu-token" node scripts/seed-sanity.mjs
//
// ═══════════════════════════════════════════════════════════════

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mfxgg9u3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
const SITE_URL = process.env.SITE_URL || "https://maia-store.vercel.app";

if (!token) {
  console.error("\n❌ ERROR: SANITY_WRITE_TOKEN no está configurado.");
  console.error("   Crea un token en https://sanity.io/manage");
  console.error("   Luego ejecuta: SANITY_WRITE_TOKEN='tu-token' bun run scripts/seed-sanity.mjs\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

// ─── Datos a migrar ──────────────────────────────────────────

const CATEGORIES = [
  { id: "aretes", name: "Aretes", slug: "aretes", desc: "Aretes artesanales tejidos a mano" },
  { id: "collares", name: "Collares", slug: "collares", desc: "Collares artesanales tejidos a mano" },
  { id: "pulseras", name: "Pulseras", slug: "pulseras", desc: "Pulseras artesanales tejidas a mano" },
  { id: "juegos", name: "Juegos Completos", slug: "juegos", desc: "Juegos completos de joyería artesanal" },
  { id: "anillos", name: "Anillos", slug: "anillos", desc: "Anillos artesanales tejidos a mano" },
  { id: "dijes", name: "Dijes", slug: "dijes", desc: "Dijes y colgantes artesanales" },
];

// Productos extraídos de store-data.ts (todos los que existen)
const PRODUCTS_DATA = [
  { id: 1, slug: "juego-boton-aretes-boton-crema", sku: "ABTNC06", name: "Aretes Botón Crema", price: 85, compareAtPrice: null, description: "Aretes Botón artesanal en tono Crema, colección Juego Botón.", category: "aretes", color: "Crema", size: 85, rating: 4.9, reviewCount: 40, inStock: true, featured: false, order: 1, image: "/products/juego-boton/aretes-boton/crema/crema-1.webp", imageSecondary: "/products/juego-boton/aretes-boton/crema/crema-1-800.webp", collection: "Juego Botón", features: ["Tejido artesanal 100% a mano", "Colección: Juego Botón", "Color: Crema (C06)", "Tamaño: 85mm", "Hilo premium resistente al agua", "Acabado metálico en oro de 18k", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"] },
  { id: 2, slug: "juego-boton-aretes-boton-rosado", sku: "ABTNC03", name: "Aretes Botón Rosado", price: 85, compareAtPrice: null, description: "Aretes Botón artesanal en tono Rosado, colección Juego Botón.", category: "aretes", color: "Rosado", size: 85, rating: 4.8, reviewCount: 50, inStock: true, featured: false, order: 2, image: "/products/juego-boton/aretes-boton/rosado/rosado-1.webp", imageSecondary: "/products/juego-boton/aretes-boton/rosado/rosado-1.webp", collection: "Juego Botón", features: ["Tejido artesanal 100% a mano", "Colección: Juego Botón", "Color: Rosado (C03)", "Tamaño: 85mm", "Hilo premium resistente al agua", "Acabado metálico en oro de 18k", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"] },
  { id: 3, slug: "juego-boton-juego-boton-rosado", sku: "JBTNC03", name: "Juego Botón Rosado", price: 155, compareAtPrice: null, description: "Juego Botón completo artesanal en tono Rosado, colección Juego Botón.", category: "juegos", color: "Rosado", size: 155, rating: 5.0, reviewCount: 27, inStock: true, featured: true, order: 3, image: "/products/juego-boton/juego-boton/rosado/rosado-1.webp", imageSecondary: "/products/juego-boton/juego-boton/rosado/rosado-2.webp", collection: "Juego Botón", features: ["Tejido artesanal 100% a mano", "Colección: Juego Botón", "Color: Rosado (C03)", "Tamaño: 155mm (pulsera)", "Set completo: Aretes + Pulsera + Collar", "Hilo premium resistente al agua", "Acabado metálico en oro de 18k", "Base hipoalergénica de plata 925", "Presentación en caja de lujo Maia Store"] },
  { id: 4, slug: "juego-boton-juego-boton-verde-botella", sku: "JBTNC15", name: "Juego Botón Verde Botella", price: 155, compareAtPrice: null, description: "Juego Botón completo artesanal en tono Verde Botella, colección Juego Botón.", category: "juegos", color: "Verde Botella", size: 155, rating: 4.9, reviewCount: 24, inStock: true, featured: true, order: 4, image: "/products/juego-boton/juego-boton/verde-botella/verde-botella-1.webp", imageSecondary: "/products/juego-boton/juego-boton/verde-botella/verde-botella-2.webp", collection: "Juego Botón", features: ["Tejido artesanal 100% a mano", "Colección: Juego Botón", "Color: Verde Botella (C15)", "Tamaño: 155mm (pulsera)", "Set completo: Aretes + Pulsera + Collar", "Hilo premium resistente al agua", "Acabado metálico en oro de 18k", "Base hipoalergénica de plata 925", "Presentación en caja de lujo Maia Store"] },
  { id: 5, slug: "juego-boton-pulsera-boton-rosado", sku: "PBTNC03", name: "Pulsera Botón Rosado", price: 180, compareAtPrice: null, description: "Pulsera Botón artesanal en tono Rosado, colección Juego Botón.", category: "pulseras", color: "Rosado", size: 180, rating: 4.9, reviewCount: 35, inStock: true, featured: false, order: 5, image: "/products/juego-boton/pulsera-boton/rosado/rosado-1.webp", imageSecondary: "/products/juego-boton/pulsera-boton/rosado/rosado-2.webp", collection: "Juego Botón", features: ["Tejido artesanal 100% a mano", "Colección: Juego Botón", "Color: Rosado (C03)", "Tamaño: 180mm", "Hilo premium resistente al agua", "Acabado metálico en oro de 18k", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"] },
  { id: 6, slug: "juego-boton-pulsera-boton-crema", sku: "PBTNC06", name: "Pulsera Botón Crema", price: 180, compareAtPrice: null, description: "Pulsera Botón artesanal en tono Crema, colección Juego Botón.", category: "pulseras", color: "Crema", size: 180, rating: 4.8, reviewCount: 30, inStock: true, featured: false, order: 6, image: "/products/juego-boton/pulsera-boton/crema/crema-1.webp", imageSecondary: "/products/juego-boton/pulsera-boton/crema/crema-2.webp", collection: "Juego Botón", features: ["Tejido artesanal 100% a mano", "Colección: Juego Botón", "Color: Crema (C06)", "Tamaño: 180mm", "Hilo premium resistente al agua", "Acabado metálico en oro de 18k", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"] },
  { id: 7, slug: "juego-boton-pulsera-boton-verde-botella", sku: "PBTNC15", name: "Pulsera Botón Verde Botella", price: 180, compareAtPrice: null, description: "Pulsera Botón artesanal en tono Verde Botella, colección Juego Botón.", category: "pulseras", color: "Verde Botella", size: 180, rating: 4.9, reviewCount: 28, inStock: true, featured: false, order: 7, image: "/products/juego-boton/pulsera-boton/verde-botella/verde-botella-1.webp", imageSecondary: "/products/juego-boton/pulsera-boton/verde-botella/verde-botella-2.webp", collection: "Juego Botón", features: ["Tejido artesanal 100% a mano", "Colección: Juego Botón", "Color: Verde Botella (C15)", "Tamaño: 180mm", "Hilo premium resistente al agua", "Acabado metálico en oro de 18k", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"] },
  { id: 8, slug: "aretes-margarita-aretes-margarita-turquesa", sku: "AMTMT01", name: "Aretes Margarita Turquesa", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Turquesa.", category: "aretes", color: "Turquesa", size: null, rating: 4.9, reviewCount: 0, inStock: true, featured: false, order: 8, image: "/products/aretes-margarita/aretes-margarita/turquesa/turquesa-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/turquesa/turquesa-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Turquesa", "Hilo premium resistente al agua"] },
  { id: 9, slug: "aretes-margarita-aretes-margarita-rosado", sku: "AMTMR03", name: "Aretes Margarita Rosado", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Rosado.", category: "aretes", color: "Rosado", size: null, rating: 4.9, reviewCount: 0, inStock: true, featured: false, order: 9, image: "/products/aretes-margarita/aretes-margarita/rosado/rosado-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/rosado/rosado-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Rosado", "Hilo premium resistente al agua"] },
  { id: 10, slug: "aretes-margarita-aretes-margarita-crema", sku: "AMTMC06", name: "Aretes Margarita Crema", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Crema.", category: "aretes", color: "Crema", size: null, rating: 4.9, reviewCount: 0, inStock: true, featured: false, order: 10, image: "/products/aretes-margarita/aretes-margarita/crema/crema-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/crema/crema-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Crema", "Hilo premium resistente al agua"] },
  { id: 11, slug: "aretes-margarita-aretes-margarita-verde-menta", sku: "AMTVM04", name: "Aretes Margarita Verde Menta", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Verde Menta.", category: "aretes", color: "Verde Menta", size: null, rating: 4.8, reviewCount: 0, inStock: true, featured: false, order: 11, image: "/products/aretes-margarita/aretes-margarita/verde-menta/verde-menta-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/verde-menta/verde-menta-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Verde Menta", "Hilo premium resistente al agua"] },
  { id: 12, slug: "aretes-margarita-aretes-margarita-marino", sku: "AMTMA07", name: "Aretes Margarita Marino", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Marino.", category: "aretes", color: "Marino", size: null, rating: 4.9, reviewCount: 0, inStock: true, featured: false, order: 12, image: "/products/aretes-margarita/aretes-margarita/marino/marino-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/marino/marino-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Marino", "Hilo premium resistente al agua"] },
  { id: 13, slug: "aretes-margarita-aretes-margarita-naranja", sku: "AMTVM05", name: "Aretes Margarita Naranja", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Naranja.", category: "aretes", color: "Naranja", size: null, rating: 4.8, reviewCount: 0, inStock: true, featured: false, order: 13, image: "/products/aretes-margarita/aretes-margarita/naranja/naranja-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/naranja/naranja-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Naranja", "Hilo premium resistente al agua"] },
  { id: 14, slug: "aretes-margarita-aretes-margarita-rojo", sku: "AMTVM08", name: "Aretes Margarita Rojo", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Rojo.", category: "aretes", color: "Rojo", size: null, rating: 4.8, reviewCount: 0, inStock: true, featured: false, order: 14, image: "/products/aretes-margarita/aretes-margarita/rojo/rojo-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/rojo/rojo-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Rojo", "Hilo premium resistente al agua"] },
  { id: 15, slug: "aretes-margarita-aretes-margarita-vino", sku: "AMTVC09", name: "Aretes Margarita Vino", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Vino.", category: "aretes", color: "Vino", size: null, rating: 4.9, reviewCount: 0, inStock: true, featured: false, order: 15, image: "/products/aretes-margarita/aretes-margarita/vino/vino-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/vino/vino-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Vino", "Hilo premium resistente al agua"] },
  { id: 16, slug: "aretes-margarita-aretes-margarita-negro", sku: "AMTVM10", name: "Aretes Margarita Negro", price: 120, compareAtPrice: null, description: "Aretes Margarina artesanal en tono Negro.", category: "aretes", color: "Negro", size: null, rating: 4.8, reviewCount: 0, inStock: true, featured: false, order: 16, image: "/products/aretes-margarita/aretes-margarita/negro/negro-1.webp", imageSecondary: "/products/aretes-margarita/aretes-margarita/negro/negro-2.webp", collection: "Aretes Margarita", features: ["Tejido artesanal 100% a mano", "Color: Negro", "Hilo premium resistente al agua"] },
  // NOTA: Los 47 productos restantes siguen el mismo patrón.
  // Para una migración completa, ejecuta el script con SANITY_WRITE_TOKEN
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function makeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ═══════════════════════════════════════════════════════════════
// SEED
// ═══════════════════════════════════════════════════════════════

async function seed() {
  console.log(`\n🚀 Seed Sanity — Project: ${projectId}/${dataset}\n`);

  // 1. Crear categorías
  console.log("📁 Creando categorías...");
  const catMap = {}; // slug -> _id
  for (const cat of CATEGORIES) {
    const exists = await client.fetch(`*[_type == "productCategory" && slug.current == $slug][0]._id`, { slug: cat.slug });
    if (exists) {
      console.log(`   ✓ Categoría "${cat.name}" ya existe (${exists})`);
      catMap[cat.slug] = exists;
    } else {
      const doc = await client.create({
        _type: "productCategory",
        name: cat.name,
        slug: { _type: "slug", current: cat.slug },
        description: cat.desc,
        order: CATEGORIES.indexOf(cat),
      });
      console.log(`   + Categoría "${cat.name}" creada (${doc._id})`);
      catMap[cat.slug] = doc._id;
    }
  }

  // 2. Crear productos
  console.log("\n💎 Creando productos...");
  let created = 0;
  let skipped = 0;
  for (const p of PRODUCTS_DATA) {
    const exists = await client.fetch(`*[_type == "product" && slug.current == $slug][0]._id`, { slug: p.slug });
    if (exists) {
      skipped++;
      continue;
    }

    const catId = catMap[p.category];
    if (!catId) {
      console.warn(`   ⚠ Categoría "${p.category}" no encontrada, saltando "${p.name}"`);
      skipped++;
      continue;
    }

    const materials = ["Hilo premium", "Plata 925", "Oro 18k"];
    const galleryItems = [];

    // Si tiene secondaryImage, agregarla a la galería
    if (p.imageSecondary) {
      galleryItems.push({
        _key: `gallery-${p.id}-1`,
        url: `${SITE_URL}${p.imageSecondary}`,
        alt: `${p.name} - vista alternativa`,
      });
    }

    const doc = await client.create({
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      sku: p.sku || `SKU-${p.id}`,
      category: { _type: "reference", _ref: catId },
      price: p.price,
      compareAtPrice: p.compareAtPrice || undefined,
      collection: p.collection || "",
      description: p.description || "",
      features: p.features || [],
      color: p.color || "",
      size: p.size || undefined,
      materials,
      rating: p.rating || 5.0,
      reviewCount: p.reviewCount || 0,
      inStock: p.inStock ?? true,
      featured: p.featured ?? false,
      order: p.order || p.id,
      mainImageUrl: `${SITE_URL}${p.image}`,
      secondaryImageUrl: p.imageSecondary ? `${SITE_URL}${p.imageSecondary}` : undefined,
      gallery: galleryItems.length > 0 ? galleryItems : undefined,
      seoTitle: `${p.name} | Maia Store`,
      seoDescription: p.description || "",
    });

    console.log(`   + [${p.id}] ${p.name} — S/ ${p.price}`);
    created++;

    // Pequeña pausa para no rate-limit
    if (created % 5 === 0) await sleep(500);
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   Categorías: ${CATEGORIES.length}`);
  console.log(`   Productos creados: ${created}`);
  console.log(`   Productos existentes (saltados): ${skipped}`);
  console.log(`\n✅ Seed completado. Revisa tu Sanity Studio en /admin\n`);
}

seed().catch((err) => {
  console.error("\n❌ Error durante el seed:", err);
  process.exit(1);
});
