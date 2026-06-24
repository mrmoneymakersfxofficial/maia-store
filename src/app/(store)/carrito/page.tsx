import type { Metadata } from 'next';
import CarritoClient from './CarritoClient';

export const metadata: Metadata = {
  title: 'Mi Carrito',
  description: 'Revisa tu carrito de compras en Maia Store. Joyería artesanal peruana tejida a mano con envío a todo el Perú.',
};

export default function CarritoRoute() {
  return <CarritoClient />;
}