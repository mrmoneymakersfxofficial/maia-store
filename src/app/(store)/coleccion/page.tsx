import type { Metadata } from 'next';
import { Suspense } from 'react';
import ColeccionClient from './ColeccionClient';

export const metadata: Metadata = {
  title: 'Colección | Maia Store — Joyas Artesanales Peruanas',
  description:
    'Explora nuestra colección completa de joyas artesanales peruanas. Pulseras, collares, aretes y más — cada pieza tejida a mano con amor y dedicación.',
  openGraph: {
    title: 'Colección | Maia Store',
    description:
      'Explora nuestra colección completa de joyas artesanales peruanas. Pulseras, collares, aretes y más — cada pieza tejida a mano.',
    type: 'website',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Maia Store — Colección de Joyas Artesanales',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.webp'],
  },
};

export default function ColeccionPage() {
  return (
    <Suspense fallback={<ColeccionSkeleton />}>
      <ColeccionClient />
    </Suspense>
  );
}

function ColeccionSkeleton() {
  return (
    <div className="relative pt-20 pb-32 sm:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-8 pt-4">
          <div className="h-4 w-32 bg-zinc-200 animate-pulse mx-auto mb-3 rounded" />
          <div className="h-10 w-64 bg-zinc-200 animate-pulse mx-auto mb-3 rounded" />
          <div className="h-4 w-80 bg-zinc-200 animate-pulse mx-auto rounded" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-zinc-200 animate-pulse rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] rounded-2xl bg-zinc-200 animate-pulse mb-2.5" />
              <div className="h-4 w-3/4 bg-zinc-200 animate-pulse rounded mb-1" />
              <div className="h-5 w-1/3 bg-zinc-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}