import type { Metadata } from 'next';
import ComprarClient from './ComprarClient';

export const metadata: Metadata = {
  title: 'Cómo Comprar',
  description: 'Aprende cómo comprar en Maia Store. Métodos de pago: tarjeta, Yape, Plin, transferencia bancaria. Envíos a todo el Perú.',
};

export default function ComprarRoute() {
  return <ComprarClient />;
}