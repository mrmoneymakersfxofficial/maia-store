
import { draftMode } from "next/headers";
import { createClient } from "@sanity/client";
import type {
  SanityImage,
  PortableTextBlock,
} from "./sanity.client";
import {
  ALL_PRODUCTS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  ALL_CATEGORIES_QUERY,
  ALL_HERO_SLIDES_QUERY,
  ALL_TESTIMONIALS_QUERY,
  FEATURED_TESTIMONIALS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./sanity.queries";

// ─── Types ─────────────────────────────────────────────
export interface SanityProduct {
  _id: string;
  slug: string;
  name: string;
  sku?: string;
  categoryName?: string;
  categorySlug?: string;
  collection?: string;
  price: number;
  compareAtPrice?: number;
  description?: string;
  longDescription?: PortableTextBlock[];
  features?: string[];
  mainImage?: SanityImage | null;
  secondaryImage?: SanityImage | null;
  gallery?: Array<{ image?: SanityImage | null; alt?: string }>;
  color?: string;
  size?: number;
  materials?: string[];
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  featured?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
  relatedProducts?: SanityProduct[];
}

export interface SanityCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: SanityImage | null;
  order?: number;
  featured?: boolean;
  productCount?: number;
}

export interface SanityHeroSlide {
  _id: string;
  title: string;
  subtitle?: PortableTextBlock[];
  backgroundImage?: SanityImage | null;
  ctaLabel?: string;
  ctaLink?: string;
  ctaType?: string;
  order?: number;
}

export interface SanityTestimonialData {
  _id: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  quote?: PortableTextBlock[];
  photo?: SanityImage | null;
  rating?: number;
  featured?: boolean;
  order?: number;
}

export interface SanitySiteSettingsData {
  _id: string;
  companyName?: string;
  slogan?: string;
  tagline?: string;
  logo?: SanityImage | null;
  logoWhite?: SanityImage | null;
  ogImage?: SanityImage | null;
  phone?: string;
  whatsapp?: string;
  email?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  facebookUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Client factory ───────────────────────────────────
function getClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion: "2025-01-01",
    useCdn: false,
    stega: {
      enabled: true,
      studioUrl: "/admin",
    },
  });
}

// ─── Fetch helpers with draft mode support ────────────
async function fetchSanityData<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  const client = getClient();
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params || {});
  } catch (e) {
    console.warn("[Sanity fetch error]", e);
    return null;
  }
}

// ─── Public data fetchers ─────────────────────────────

export async function getSiteSettings(): Promise<SanitySiteSettingsData | null> {
  return fetchSanityData<SanitySiteSettingsData>(SITE_SETTINGS_QUERY);
}

export async function getHeroSlides(): Promise<SanityHeroSlide[]> {
  const data = await fetchSanityData<SanityHeroSlide[]>(ALL_HERO_SLIDES_QUERY);
  return data || [];
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  const data = await fetchSanityData<SanityProduct[]>(FEATURED_PRODUCTS_QUERY);
  return data || [];
}

export async function getAllProducts(): Promise<SanityProduct[]> {
  const data = await fetchSanityData<SanityProduct[]>(ALL_PRODUCTS_QUERY);
  return data || [];
}

export async function getProductsByCategory(categorySlug: string): Promise<SanityProduct[]> {
  const data = await fetchSanityData<SanityProduct[]>(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug });
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  return fetchSanityData<SanityProduct>(PRODUCT_BY_SLUG_QUERY, { slug });
}

export async function getAllCategories(): Promise<SanityCategory[]> {
  const data = await fetchSanityData<SanityCategory[]>(ALL_CATEGORIES_QUERY);
  return data || [];
}

export async function getAllTestimonials(): Promise<SanityTestimonialData[]> {
  const data = await fetchSanityData<SanityTestimonialData[]>(ALL_TESTIMONIALS_QUERY);
  return data || [];
}

export async function getFeaturedTestimonials(): Promise<SanityTestimonialData[]> {
  const data = await fetchSanityData<SanityTestimonialData[]>(FEATURED_TESTIMONIALS_QUERY);
  return data || [];
}
