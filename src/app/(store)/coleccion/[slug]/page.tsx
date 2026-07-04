import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/live';
import { PRODUCT_BY_SLUG_QUERY, ALL_PRODUCTS_QUERY } from '@/lib/sanity.queries';
import { products as storeProducts, getProductBySlug, formatPrice } from '@/lib/store-data';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maia-store.vercel.app';

// Shared product type for passing to client
export interface ProductData {
  _id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  longDescription: string;
  mainImage: string;
  secondaryImage?: string;
  gallery: Array<{ original: string; thumbnail: string }>;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  color: { name: string };
  features: string[];
  sku: string;
  rating: number;
  reviews: number;
  collection: string;
  inStock: boolean;
  materials?: string[];
  size?: string;
}

function mapSanityProduct(p: any): ProductData {
  return {
    _id: p._id, slug: p.slug, name: p.name, price: p.price,
    compareAtPrice: p.compareAtPrice, description: p.description || '', longDescription: p.longDescription || '',
    mainImage: p.mainImage || '', secondaryImage: p.secondaryImage || '',
    gallery: (p.gallery || []).map((g: any) => ({ original: g.url || '', thumbnail: g.url || '' })),
    category: p.category?.slug || '', categoryLabel: p.category?.name || '', categorySlug: p.category?.slug || '',
    color: { name: p.color || '' }, features: p.features || [], sku: p.sku || '',
    rating: p.rating || 5, reviews: p.reviewCount || 0, collection: p.collection || '',
    inStock: p.inStock ?? true, materials: p.materials, size: p.size,
  };
}

function mapStoreProduct(p: any): ProductData {
  return {
    _id: `store-${p.id}`, slug: p.slug, name: p.name, price: p.price,
    compareAtPrice: p.compareAtPrice, description: p.description || '', longDescription: p.longDescription || '',
    mainImage: p.image, secondaryImage: p.imageSecondary,
    gallery: p.images, category: p.category, categoryLabel: p.categoryLabel,
    categorySlug: p.category, color: p.color, features: p.features, sku: p.sku,
    rating: p.rating, reviews: p.reviews, collection: p.collection,
    inStock: true, materials: p.materials, size: p.size,
  };
}

// Skip static generation — products are fetched from Sanity or store-data at request time
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Producto no encontrado | Maia Store' };
  return {
    title: `${product.name} | Maia Store`,
    description: product.longDescription || product.description,
    openGraph: { title: `${product.name} — Maia Store`, description: product.longDescription || product.description, type: 'website', url: `${BASE_URL}/coleccion/${product.slug}`, images: [{ url: product.image, width: 800, height: 800, alt: product.name }] },
    twitter: { card: 'summary_large_image', title: `${product.name} — Maia Store`, description: product.longDescription || product.description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Sanity first
  let product: ProductData | null = null;
  let allProducts: ProductData[] = [];
  let useFallback = true;

  try {
    const sanityProduct = await sanityFetch<any>({ query: PRODUCT_BY_SLUG_QUERY, params: { slug } });
    const spData = sanityProduct?.data;
    if (spData) {
      product = mapSanityProduct(spData);
      const allSanity: any = await sanityFetch({ query: ALL_PRODUCTS_QUERY });
      allProducts = (allSanity?.data ?? []).map(mapSanityProduct);
      useFallback = false;
    }
  } catch {}

  // Fallback to store-data
  if (!product) {
    const storeProduct = getProductBySlug(slug);
    if (!storeProduct) notFound();
    product = mapStoreProduct(storeProduct);
    allProducts = storeProducts.map(mapStoreProduct);
  }

  return <ProductDetailClient product={product} allProducts={allProducts} useFallback={useFallback} />;
}