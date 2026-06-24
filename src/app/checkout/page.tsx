import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Completa tu compra en Maia Store. Pago seguro con tarjeta, Yape, Plin o transferencia bancaria. Envío gratis a todo el Perú.',
};

export default function CheckoutRoute() {
  return <CheckoutClient />;
}