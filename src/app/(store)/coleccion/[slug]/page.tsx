import type { Metadata } from 'next';
import { products, getProductBySlug, formatPrice } from '@/lib/store-data';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maia-store.vercel.app';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Producto no encontrado | Maia Store' };
  }

  return {
    title: `${product.name} | Maia Store`,
    description: product.longDescription || product.description,
    openGraph: {
      title: `${product.name} — Maia Store`,
      description: product.longDescription || product.description,
      type: 'website',
      url: `${BASE_URL}/coleccion/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Maia Store`,
      description: product.longDescription || product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient slug={slug} />;
}