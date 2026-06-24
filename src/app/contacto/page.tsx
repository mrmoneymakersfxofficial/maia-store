import type { Metadata } from 'next';
import ContactoClient from './ContactoClient';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos por WhatsApp, Instagram o TikTok. Asesoría personalizada para tu joya artesanal perfecta. Maia Store, joyería peruana tejida a mano.',
};

export default function ContactoRoute() {
  return <ContactoClient />;
}