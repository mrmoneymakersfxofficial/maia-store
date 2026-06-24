import type { Metadata } from 'next';
import NosotrosPage from '@/components/maia/pages/NosotrosPage';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia de Maia Store. Joyería artesanal peruana tejida a mano con técnicas ancestrales y materiales premium.',
};

export default function NosotrosRoute() {
  return <NosotrosPage />;
}