import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { categories } from '@/lib/store-data';

// Map of category IDs to human-readable names for metadata
const CATEGORY_NAMES: Record<string, string> = {
  juegos: 'Juegos de Joyas',
  pulseras: 'Pulseras',
  collares: 'Collares',
  aretes: 'Aretes',
  anillos: 'Anillos',
  tobilleras: 'Tobilleras',
  sets: 'Sets',
};

interface PageProps {
  params: Promise<{ categoria: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const label = CATEGORY_NAMES[categoria] || categoria;

  return {
    title: `${label} | Colección — Maia Store`,
    description: `Descubre nuestra colección de ${label.toLowerCase()} artesanales. Joyas tejidas a mano en Perú con amor y dedicación.`,
  };
}

// Allow static generation for known categories
export function generateStaticParams() {
  return categories
    .filter((c) => c.id !== 'todos')
    .map((cat) => ({ categoria: cat.id }));
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params;

  // Redirect to the canonical query-based URL for backwards compatibility
  redirect(`/coleccion?categoria=${categoria}`);
}