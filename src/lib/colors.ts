// ═══════════════════════════════════════════════════════════════
// Maia Store — Color Swatches
// Mapa de colores de productos para mostrar los círculos de color
// ═══════════════════════════════════════════════════════════════

export const COLOR_SWATCHES: Record<string, string> = {
  'Crema': '#F5F0E1',
  'Rosado': '#F4B8C1',
  'Rosa Pastel': '#F8BBD0',
  'Verde Botella': '#2E5E3D',
  'Verde Menta': '#98D8C8',
  'Verde Agua': '#80CBC4',
  'Turquesa': '#00ACC1',
  'Fucsia': '#C2185B',
  'Morado': '#7B1FA2',
  'Marino': '#1A237E',
  'Naranja': '#FF9800',
  'Rojo': '#E53935',
  'Vino': '#880E4F',
  'Negro': '#212121',
  'Blanco': '#FAFAFA',
  'Cuarzo Rosa': '#E57373',
  'Jaspe Imperial': '#8D6E63',
  'Rodocrosita': '#E57373',
  'Simple': '#BDBDBD',
  'Dorado': '#FFD700',
  'Plateado': '#C0C0C0',
  'Cobre': '#D84315',
  'Lavanda': '#CE93D8',
  'Celeste': '#64B5F6',
  'Mostaza': '#F9A825',
  'Coral': '#FF7043',
  'Menta': '#66BB6A',
  'Burgundy': '#880E4F',
};

export function getSwatchColor(colorName: string | undefined | null): string {
  if (!colorName) return '#ccc';
  return COLOR_SWATCHES[colorName] || '#ccc';
}
