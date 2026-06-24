import type { Metadata } from 'next';
import FavoritosClient from './FavoritosClient';

export const metadata: Metadata = {
  title: 'Mis Favoritos',
  description: 'Revisa tus joyas favoritas guardadas en Maia Store. Joyería artesanal peruana tejida a mano.',
};

export default function FavoritosRoute() {
  return <FavoritosClient />;
}