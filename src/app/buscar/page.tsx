import type { Metadata } from 'next';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Buscar',
  description: 'Busca joyas artesanales en Maia Store. Encuentra aretes, collares, pulseras y más. Joyería peruana tejida a mano.',
};

export default function SearchRoute() {
  return <SearchClient />;
}