import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { getProductBySlug, getAllProducts } from '@/lib/data';
import { getImageUrl } from '@/lib/sanity.client';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maia-store.vercel.app';

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Producto no encontrado | Maia Store' };
  }

  const imageUrl = getImageUrl(product.mainImage, 800, 800) || '';
  return {
    title: `${product.name} | Maia Store`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Maia Store`,
      description: product.description,
      type: 'website',
      url: `${BASE_URL}/coleccion/${product.slug}`,
      images: [{ url: imageUrl, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Maia Store`,
      description: product.description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
