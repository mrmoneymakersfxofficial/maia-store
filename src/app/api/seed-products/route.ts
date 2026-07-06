// ═══════════════════════════════════════════════════════════════
// API Route: Seed Products into Sanity
// Crea todos los productos de store-data.ts como documentos
// de Sanity para que el overlay visual funcione correctamente.
//
// USO: GET /api/seed-products?token=TU_TOKEN_ESCRITURA
// ═══════════════════════════════════════════════════════════════

import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mfxgg9u3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://maia-store.vercel.app";

// ─── Categorías ──────────────────────────────────────────────

const CATEGORIES = [
  { id: "aretes", name: "Aretes", slug: "aretes", desc: "Aretes artesanales tejidos a mano", order: 1 },
  { id: "collares", name: "Collares", slug: "collares", desc: "Collares artesanales tejidos a mano", order: 2 },
  { id: "pulseras", name: "Pulseras", slug: "pulseras", desc: "Pulseras artesanales tejidas a mano", order: 3 },
  { id: "juegos", name: "Juegos Completos", slug: "juegos", desc: "Juegos completos de joyería artesanal", order: 4 },
  { id: "anillos", name: "Anillos", slug: "anillos", desc: "Anillos artesanales tejidos a mano", order: 5 },
  { id: "dijes", name: "Dijes", slug: "dijes", desc: "Dijes y colgantes artesanales", order: 6 },
];

// ─── Productos (importados de store-data.ts) ─────────────────
// Se importan dinámicamente para tener todos los 63 productos

async function getProductsFromStore() {
  try {
    const storeData = await import("@/lib/store-data");
    return storeData.products || [];
  } catch {
    return [];
  }
}

function mapProductToSanity(p: any, catMap: Record<string, string>) {
  const catId = catMap[p.category];
  if (!catId) return null;

  return {
    _type: "product",
    name: p.name,
    slug: { _type: "slug", current: p.slug },
    sku: p.sku || `SKU-${p.id}`,
    category: { _type: "reference", _ref: catId },
    price: p.price,
    compareAtPrice: p.compareAtPrice || undefined,
    collection: p.collection?.name || p.collection || "",
    description: p.description || "",
    features: p.features || [],
    color: p.color?.name || p.color || "",
    size: p.size || undefined,
    materials: ["Hilo premium", "Plata 925", "Oro 18k"],
    rating: p.rating || 5.0,
    reviewCount: p.reviews || p.reviewCount || 0,
    inStock: p.inStock ?? true,
    featured: p.featured ?? false,
    order: p.order || p.id,
    mainImageUrl: `${SITE_URL}${p.image}`,
    secondaryImageUrl: p.imageSecondary ? `${SITE_URL}${p.imageSecondary}` : undefined,
    gallery: p.images?.slice(0, 5).map((img: any, i: number) => ({
      _key: `gallery-${p.id}-${i}`,
      url: `${SITE_URL}${img.original || img.url}`,
      alt: `${p.name} - vista ${i + 1}`,
    })) || [],
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Se requiere un token de escritura de Sanity. Pásalo como ?token=xxx" },
      { status: 400 }
    );
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2025-01-01",
    useCdn: false,
  });

  const results = { categories: { created: 0, existing: 0 }, products: { created: 0, skipped: 0 }, errors: [] as string[] };

  try {
    // ─── 1. Crear categorías ────────────────────────────────
    const catMap: Record<string, string> = {};
    for (const cat of CATEGORIES) {
      const existing: string | null = await client.fetch(
        `*[_type == "productCategory" && slug.current == $slug][0]._id`,
        { slug: cat.slug }
      );
      if (existing) {
        catMap[cat.slug] = existing;
        results.categories.existing++;
      } else {
        const doc = await client.create({
          _type: "productCategory",
          name: cat.name,
          slug: { _type: "slug", current: cat.slug },
          description: cat.desc,
          order: cat.order,
        });
        catMap[cat.slug] = doc._id;
        results.categories.created++;
      }
    }

    // ─── 2. Crear productos ─────────────────────────────────
    const storeProducts = await getProductsFromStore();
    const productsToCreate = storeProducts.length > 0 ? storeProducts : [];

    if (productsToCreate.length === 0) {
      results.errors.push("No se encontraron productos en store-data.ts");
    }

    for (const p of productsToCreate) {
      try {
        const existing: string | null = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]._id`,
          { slug: p.slug }
        );
        if (existing) {
          results.products.skipped++;
          continue;
        }

        const sanityDoc = mapProductToSanity(p, catMap);
        if (!sanityDoc) {
          results.errors.push(`Categoría no encontrada para: ${p.name}`);
          continue;
        }

        await client.create(sanityDoc);
        results.products.created++;
      } catch (err: any) {
        results.errors.push(`${p.name}: ${err.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seed completado. ${results.products.created} productos creados, ${results.products.skipped} existentes.`,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, results }, { status: 500 });
  }
}
