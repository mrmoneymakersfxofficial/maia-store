// ============================================================
// Maia Store — Shared Data Layer
// Products, categories, testimonials, payment methods, etc.
// Auto-generated from scripts/import-products.mjs
// ============================================================

export interface ProductImage {
  original: string;
  optimized: string;
  thumbnail: string;
}

export interface Product {
  id: number;
  slug: string;
  sku: string;
  name: string;
  fullName: string;
  price: number;
  image: string;
  imageSecondary?: string;
  images: ProductImage[];
  category: string;
  categoryLabel: string;
  collection: { id: string; name: string };
  type: { id: string; name: string };
  color: { name: string; code: string | null };
  size: number | null;
  description: string;
  longDescription: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface BankAccount {
  bank: string;
  accountType: string;
  number: string;
  holder: string;
  logo: string;
}

export interface QRPayment {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  number: string;
  holder: string;
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  count: number;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  steps: string[];
}

export interface FeatureValue {
  icon: string;
  title: string;
  description: string;
}

// ─── Products (Real — Juego Botón Collection) ──────────────────

export const products: Product[] = [
  {
    id: 1,
    slug: 'juego-boton-aretes-boton-crema',
    sku: 'ABTNC06',
    name: 'Aretes Botón Crema',
    fullName: 'Aretes Botón Crema — Juego Botón',
    price: 45.0,
    image: '/products/juego-boton/aretes-boton/crema/crema-1.webp',
    imageSecondary: '/products/juego-boton/aretes-boton/crema/crema-1-800.webp',
    images: [
      {
        original: '/products/juego-boton/aretes-boton/crema/crema-1.webp',
        optimized: '/products/juego-boton/aretes-boton/crema/crema-1-800.webp',
        thumbnail: '/products/juego-boton/aretes-boton/crema/crema-1-thumb.webp',
      },
    ],
    category: 'aretes',
    categoryLabel: 'Aretes',
    collection: { id: 'juego-boton', name: 'Juego Botón' },
    type: { id: 'aretes-boton', name: 'Aretes Botón' },
    color: { name: 'Crema', code: 'C06' },
    size: 85,
    description: 'Aretes Botón artesanal en tono Crema, colección Juego Botón.',
    longDescription:
      'Elegantes Aretes Botón en tono crema, parte de la exclusiva colección "Juego Botón". Cada pieza es tejida a mano por nuestras artesanas expertas utilizando materiales premium importados, destacando los detalles característicos de la joyería peruana contemporánea. El diseño de botón central añade un toque de sofisticación clásica que complementa cualquier outfit, desde looks casuales hasta outfits más formales. Su tamaño de 85mm los hace perfectos para uso diario, ligeros y cómodos sin sacrificar presencia.',
    features: [
      'Tejido artesanal 100% a mano',
      'Colección: Juego Botón',
      'Color: Crema (C06)',
      'Tamaño: 85mm',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 4.9,
    reviews: 40,
    inStock: true,
  },
  {
    id: 2,
    slug: 'juego-boton-aretes-boton-rosado',
    sku: 'ABTNC03',
    name: 'Aretes Botón Rosado',
    fullName: 'Aretes Botón Rosado — Juego Botón',
    price: 45.0,
    image: '/products/juego-boton/aretes-boton/rosado/rosado-1.webp',
    imageSecondary: '/products/juego-boton/aretes-boton/rosado/rosado-1.webp',
    images: [
      {
        original: '/products/juego-boton/aretes-boton/rosado/rosado-1.webp',
        optimized: '/products/juego-boton/aretes-boton/rosado/rosado-1.webp',
        thumbnail: '/products/juego-boton/aretes-boton/rosado/rosado-1-thumb.webp',
      },
    ],
    category: 'aretes',
    categoryLabel: 'Aretes',
    collection: { id: 'juego-boton', name: 'Juego Botón' },
    type: { id: 'aretes-boton', name: 'Aretes Botón' },
    color: { name: 'Rosado', code: 'C03' },
    size: 85,
    description: 'Aretes Botón artesanal en tono Rosado, colección Juego Botón.',
    longDescription:
      'Elegantes Aretes Botón en tono rosado, parte de la exclusiva colección "Juego Botón". El color rosado suave aporta una feminidad natural que realza cualquier rostro. Tejidos a mano con hilo de algodón premium de alta resistencia, estos aretes combinan tradición artesanal con diseño contemporáneo. El botón central es un elemento distintivo de esta colección, simbolizando la conexión entre lo clásico y lo moderno en la joyería peruana.',
    features: [
      'Tejido artesanal 100% a mano',
      'Colección: Juego Botón',
      'Color: Rosado (C03)',
      'Tamaño: 85mm',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 50,
    inStock: true,
  },
  {
    id: 3,
    slug: 'juego-boton-juego-boton-rosado',
    sku: 'JBTNC03',
    name: 'Juego Botón Rosado',
    fullName: 'Juego Botón Rosado — Juego Botón',
    price: 120.0,
    image: '/products/juego-boton/juego-boton/rosado/rosado-1.webp',
    imageSecondary: '/products/juego-boton/juego-boton/rosado/rosado-2.webp',
    images: [
      {
        original: '/products/juego-boton/juego-boton/rosado/rosado-1.webp',
        optimized: '/products/juego-boton/juego-boton/rosado/rosado-1-800.webp',
        thumbnail: '/products/juego-boton/juego-boton/rosado/rosado-1-thumb.webp',
      },
      {
        original: '/products/juego-boton/juego-boton/rosado/rosado-2.webp',
        optimized: '/products/juego-boton/juego-boton/rosado/rosado-2-800.webp',
        thumbnail: '/products/juego-boton/juego-boton/rosado/rosado-2-thumb.webp',
      },
      {
        original: '/products/juego-boton/juego-boton/rosado/rosado-3.webp',
        optimized: '/products/juego-boton/juego-boton/rosado/rosado-3-800.webp',
        thumbnail: '/products/juego-boton/juego-boton/rosado/rosado-3-thumb.webp',
      },
    ],
    category: 'juegos',
    categoryLabel: 'Juegos Completos',
    collection: { id: 'juego-boton', name: 'Juego Botón' },
    type: { id: 'juego-boton', name: 'Juego Botón' },
    color: { name: 'Rosado', code: 'C03' },
    size: 155,
    description: 'Juego Botón completo artesanal en tono Rosado, colección Juego Botón.',
    longDescription:
      'El Juego Botón Rosado es nuestra pieza estrella de la colección. Este juego completo incluye aretes, pulsera y collar coordinados en tono rosado, creando un conjunto armónico que define el concepto de joyería artesanal premium peruana. Cada pieza del juego es tejida individualmente a mano con hilo de algodón premium, combinando diferentes técnicas de tejido que nuestras artesanas han perfeccionado durante años. El resultado es un set que proyecta elegancia y sofisticación, ideal para ocasiones especiales o para elevar tu look cotidiano. El tamaño de 155mm en la pulsera garantiza un ajuste cómodo en diferentes muñecas.',
    features: [
      'Tejido artesanal 100% a mano',
      'Colección: Juego Botón',
      'Color: Rosado (C03)',
      'Tamaño: 155mm (pulsera)',
      'Set completo: Aretes + Pulsera + Collar',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de lujo Maia Store',
    ],
    rating: 5.0,
    reviews: 27,
    inStock: true,
  },
  {
    id: 4,
    slug: 'juego-boton-juego-boton-verde-botella',
    sku: 'JBTNC15',
    name: 'Juego Botón Verde Botella',
    fullName: 'Juego Botón Verde Botella — Juego Botón',
    price: 120.0,
    image: '/products/juego-boton/juego-boton/verde-botella/verde-botella-1.webp',
    imageSecondary: '/products/juego-boton/juego-boton/verde-botella/verde-botella-2.webp',
    images: [
      {
        original: '/products/juego-boton/juego-boton/verde-botella/verde-botella-1.webp',
        optimized: '/products/juego-boton/juego-boton/verde-botella/verde-botella-1-800.webp',
        thumbnail: '/products/juego-boton/juego-boton/verde-botella/verde-botella-1-thumb.webp',
      },
      {
        original: '/products/juego-boton/juego-boton/verde-botella/verde-botella-2.webp',
        optimized: '/products/juego-boton/juego-boton/verde-botella/verde-botella-2-800.webp',
        thumbnail: '/products/juego-boton/juego-boton/verde-botella/verde-botella-2-thumb.webp',
      },
    ],
    category: 'juegos',
    categoryLabel: 'Juegos Completos',
    collection: { id: 'juego-boton', name: 'Juego Botón' },
    type: { id: 'juego-boton', name: 'Juego Botón' },
    color: { name: 'Verde Botella', code: 'C15' },
    size: 155,
    description: 'Juego Botón completo artesanal en tono Verde Botella, colección Juego Botón.',
    longDescription:
      'El Juego Botón Verde Botella es una pieza que captura la esencia de la naturaleza peruana. El tono verde botella profundo evoca los paisajes de la sierra y la selva, creando una conexión especial con nuestras raíces. Este juego completo combina aretes, pulsera y collar en una armonía de texturas y tonalidades que refleja la maestría artesanal de nuestras tejedoras. Cada nudo, cada vuelta del hilo premium, está realizado con precisión milimétrica para garantizar un acabado impecable. Es la elección perfecta para quienes buscan una joya que cuente una historia y que se distinga por su singularidad.',
    features: [
      'Tejido artesanal 100% a mano',
      'Colección: Juego Botón',
      'Color: Verde Botella (C15)',
      'Tamaño: 155mm (pulsera)',
      'Set completo: Aretes + Pulsera + Collar',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de lujo Maia Store',
    ],
    rating: 4.9,
    reviews: 24,
    inStock: true,
  },
  {
    id: 5,
    slug: 'juego-boton-pulsera-boton-rosado',
    sku: 'PBTNC03',
    name: 'Pulsera Botón Rosado',
    fullName: 'Pulsera Botón Rosado — Juego Botón',
    price: 65.0,
    image: '/products/juego-boton/pulsera-boton/rosado/rosado-1.webp',
    imageSecondary: '/products/juego-boton/pulsera-boton/rosado/rosado-2.webp',
    images: [
      {
        original: '/products/juego-boton/pulsera-boton/rosado/rosado-1.webp',
        optimized: '/products/juego-boton/pulsera-boton/rosado/rosado-1-800.webp',
        thumbnail: '/products/juego-boton/pulsera-boton/rosado/rosado-1-thumb.webp',
      },
      {
        original: '/products/juego-boton/pulsera-boton/rosado/rosado-2.webp',
        optimized: '/products/juego-boton/pulsera-boton/rosado/rosado-2-800.webp',
        thumbnail: '/products/juego-boton/pulsera-boton/rosado/rosado-2-thumb.webp',
      },
      {
        original: '/products/juego-boton/pulsera-boton/rosado/rosado-3.webp',
        optimized: '/products/juego-boton/pulsera-boton/rosado/rosado-3-800.webp',
        thumbnail: '/products/juego-boton/pulsera-boton/rosado/rosado-3-thumb.webp',
      },
    ],
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    collection: { id: 'juego-boton', name: 'Juego Botón' },
    type: { id: 'pulsera-boton', name: 'Pulsera Botón' },
    color: { name: 'Rosado', code: 'C03' },
    size: 180,
    description: 'Pulsera Botón artesanal en tono Rosado, colección Juego Botón.',
    longDescription:
      'La Pulsera Botón Rosado es una declaración de estilo artesanal con un toque de feminidad delicada. Tejida a mano con hilo de algodón premium en tono rosado suave, esta pulsera presenta el característico botón central que define la colección Juego Botón. Con un tamaño de 180mm, ofrece un ajuste cómodo y versátil que se adapta a diferentes estilos de muñeca. La combinación del tejido artesanal con el acabado metálico en oro de 18k crea una pieza que transiciona perfectamente del día a la noche, convirtiéndola en un accesorio imprescindible en cualquier colección de joyas.',
    features: [
      'Tejido artesanal 100% a mano',
      'Colección: Juego Botón',
      'Color: Rosado (C03)',
      'Tamaño: 180mm',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Botón central decorativo',
      'Presentación en caja de regalo',
    ],
    rating: 4.9,
    reviews: 64,
    inStock: true,
  },
  {
    id: 6,
    slug: 'juego-boton-pulsera-boton-verde-botella',
    sku: 'PBTNC15',
    name: 'Pulsera Botón Verde Botella',
    fullName: 'Pulsera Botón Verde Botella — Juego Botón',
    price: 65.0,
    image: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-1.webp',
    imageSecondary: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-2.webp',
    images: [
      {
        original: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-1.webp',
        optimized: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-1-800.webp',
        thumbnail: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-1-thumb.webp',
      },
      {
        original: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-2.webp',
        optimized: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-2-800.webp',
        thumbnail: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-2-thumb.webp',
      },
      {
        original: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-3.webp',
        optimized: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-3-800.webp',
        thumbnail: '/products/juego-boton/pulsera-boton/verde-botella/verde-botella-3-thumb.webp',
      },
    ],
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    collection: { id: 'juego-boton', name: 'Juego Botón' },
    type: { id: 'pulsera-boton', name: 'Pulsera Botón' },
    color: { name: 'Verde Botella', code: 'C15' },
    size: 180,
    description: 'Pulsera Botón artesanal en tono Verde Botella, colección Juego Botón.',
    longDescription:
      'La Pulsera Botón Verde Botella es una pieza que destaca por su tonalidad única y sofisticada. El verde botella profundo es un color que evoca elegancia natural y que se convierte en el centro de atención en cualquier muñeca. Con 180mm de longitud, esta pulsera artesanal es tejida a mano con hilo premium que garantiza durabilidad y resistencia al agua. El botón central en acabado dorado añade un punto de contraste lumínico que realza la belleza del tejido. Una pieza versátil que combina con looks tanto informales como elegantes, perfecta para quienes buscan originalidad en cada detalle.',
    features: [
      'Tejido artesanal 100% a mano',
      'Colección: Juego Botón',
      'Color: Verde Botella (C15)',
      'Tamaño: 180mm',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Botón central decorativo',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 48,
    inStock: true,
  },

  // ─── Juego María Swarovski Collection (7–12) ───────────────

  {
    id: 7,
    slug: 'juego-maria-swarovski-aretes-maria-swarovski-fucsia',
    sku: 'AMR4S0',
    name: 'Aretes María Swarovski Fucsia',
    fullName: 'Aretes María Swarovski Fucsia — Juego María Swarovski',
    price: 75.0,
    image: '/products/juego-maria-swarovski/aretes-maria-swarovski/fucsia/fucsia-1.webp',
    imageSecondary: '/products/juego-maria-swarovski/aretes-maria-swarovski/fucsia/fucsia-1.webp',
    images: [
      {
        original: '/products/juego-maria-swarovski/aretes-maria-swarovski/fucsia/fucsia-1.webp',
        optimized: '/products/juego-maria-swarovski/aretes-maria-swarovski/fucsia/fucsia-1-800.webp',
        thumbnail: '/products/juego-maria-swarovski/aretes-maria-swarovski/fucsia/fucsia-1-thumb.webp',
      },
    ],
    category: 'aretes',
    categoryLabel: 'Aretes',
    collection: { id: 'juego-maria-swarovski', name: 'Juego María Swarovski' },
    type: { id: 'aretes-maria-swarovski', name: 'Aretes María Swarovski' },
    color: { name: 'Fucsia', code: 'S04' },
    size: 165,
    description: 'Aretes María Swarovski artesanal en tono Fucsia, colección Juego María Swarovski.',
    longDescription:
      'Descubre la sofisticación de los Aretes María Swarovski en vibrante tono fucsia, una pieza que redefine el concepto de joyería artesanal premium. Cada arete está elaborado a mano por nuestras artesanas peruanas, combinando técnicas ancestrales de tejido con cristales Swarovski genuinos que aportan un brillo incomparable. El fucsia intenso es un color que transmite energía, confianza y personalidad, perfecto para quienes buscan un accesorio que marque la diferencia. Con 165mm de longitud, estos aretes ofrecen una presencia elegante sin resultar pesados, gracias a la ligereza de los materiales utilizados. La base hipoalergénica de plata 925 garantiza comodidad prolongada, mientras que el acabado metálico en oro de 18k añade un toque de lujo sutil que eleva cada look.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego María Swarovski',
      'Color: Fucsia (S04)',
      'Tamaño: 165mm',
      'Cristales Swarovski genuinos',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 4.9,
    reviews: 54,
    inStock: true,
  },
  {
    id: 8,
    slug: 'juego-maria-swarovski-aretes-maria-swarovski-turquesa',
    sku: 'AMR4S08',
    name: 'Aretes María Swarovski Turquesa',
    fullName: 'Aretes María Swarovski Turquesa — Juego María Swarovski',
    price: 75.0,
    image: '/products/juego-maria-swarovski/aretes-maria-swarovski/turquesa/turquesa-1.webp',
    imageSecondary: '/products/juego-maria-swarovski/aretes-maria-swarovski/turquesa/turquesa-1.webp',
    images: [
      {
        original: '/products/juego-maria-swarovski/aretes-maria-swarovski/turquesa/turquesa-1.webp',
        optimized: '/products/juego-maria-swarovski/aretes-maria-swarovski/turquesa/turquesa-1-800.webp',
        thumbnail: '/products/juego-maria-swarovski/aretes-maria-swarovski/turquesa/turquesa-1-thumb.webp',
      },
    ],
    category: 'aretes',
    categoryLabel: 'Aretes',
    collection: { id: 'juego-maria-swarovski', name: 'Juego María Swarovski' },
    type: { id: 'aretes-maria-swarovski', name: 'Aretes María Swarovski' },
    color: { name: 'Turquesa', code: 'S08' },
    size: 165,
    description: 'Aretes María Swarovski artesanal en tono Turquesa, colección Juego María Swarovski.',
    longDescription:
      'Los Aretes María Swarovski en tono turquesa son una invitación al lujo sereno. La tonalidad turquesa evoca las aguas cristalinas de las costas peruanas, creando una pieza que combina la frescura del color con la elegancia de los cristales Swarovski genuinos incrustados a mano. Cada arete es resultado de un minucioso proceso artesanal donde nuestras tejedoras entrelazan hilos premium con precisión milimétrica, asegurando que cada cristal quede perfectamente posicionado para capturar y reflejar la luz de forma espectacular. Con 165mm de longitud, logran un equilibrio perfecto entre presencia visual y comodidad de uso, ideales tanto para eventos especiales como para darle un toque sofisticado a tu día a día. La base de plata 925 hipoalergénica y el acabado en oro de 18k completan una pieza que es sinónimo de calidad y buen gusto.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego María Swarovski',
      'Color: Turquesa (S08)',
      'Tamaño: 165mm',
      'Cristales Swarovski genuinos',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 64,
    inStock: true,
  },
  {
    id: 9,
    slug: 'juego-maria-swarovski-collar-maria-swarovski-fucsia',
    sku: 'CMR4S04',
    name: 'Collar María Swarovski Fucsia',
    fullName: 'Collar María Swarovski Fucsia — Juego María Swarovski',
    price: 85.0,
    image: '/products/juego-maria-swarovski/collar-maria-swarovski/fucsia/fucsia-1.webp',
    imageSecondary: '/products/juego-maria-swarovski/collar-maria-swarovski/fucsia/fucsia-1.webp',
    images: [
      {
        original: '/products/juego-maria-swarovski/collar-maria-swarovski/fucsia/fucsia-1.webp',
        optimized: '/products/juego-maria-swarovski/collar-maria-swarovski/fucsia/fucsia-1-800.webp',
        thumbnail: '/products/juego-maria-swarovski/collar-maria-swarovski/fucsia/fucsia-1-thumb.webp',
      },
    ],
    category: 'collares',
    categoryLabel: 'Collares',
    collection: { id: 'juego-maria-swarovski', name: 'Juego María Swarovski' },
    type: { id: 'collar-maria-swarovski', name: 'Collar María Swarovski' },
    color: { name: 'Fucsia', code: 'S04' },
    size: 130,
    description: 'Collar María Swarovski artesanal en tono Fucsia, colección Juego María Swarovski.',
    longDescription:
      'El Collar María Swarovski en fucsia es el epitome de la elegancia artesanal con un toque contemporáneo. Esta pieza central de la colección Juego María Swarovski combina el tejido a mano tradicional peruano con cristales Swarovski genuinos que desprenden destellos de luz con cada movimiento. El collar, con 130mm de longitud, se ajusta perfectamente al cuello creando un efecto visual impactante donde el fucsia vibrante resalta la luminosidad de los cristales. Cada pieza requiere horas de trabajo minucioso por parte de nuestras artesanas, que combinan técnicas heredadas con innovadores acabados en oro de 18k y bases de plata 925 hipoalergénica. Es más que un collar: es una declaración de estilo que honra la tradición joyera peruana mientras abraza la sofisticación internacional de los cristales Swarovski.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego María Swarovski',
      'Color: Fucsia (S04)',
      'Tamaño: 130mm',
      'Cristales Swarovski genuinos',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Cierre ajustable seguro',
      'Presentación en caja de regalo',
    ],
    rating: 5.0,
    reviews: 20,
    inStock: true,
  },
  {
    id: 10,
    slug: 'juego-maria-swarovski-collar-maria-swarovski-turquesa',
    sku: 'CMR4S08',
    name: 'Collar María Swarovski Turquesa',
    fullName: 'Collar María Swarovski Turquesa — Juego María Swarovski',
    price: 85.0,
    image: '/products/juego-maria-swarovski/collar-maria-swarovski/turquesa/turquesa-1.webp',
    imageSecondary: '/products/juego-maria-swarovski/collar-maria-swarovski/turquesa/turquesa-1.webp',
    images: [
      {
        original: '/products/juego-maria-swarovski/collar-maria-swarovski/turquesa/turquesa-1.webp',
        optimized: '/products/juego-maria-swarovski/collar-maria-swarovski/turquesa/turquesa-1-800.webp',
        thumbnail: '/products/juego-maria-swarovski/collar-maria-swarovski/turquesa/turquesa-1-thumb.webp',
      },
    ],
    category: 'collares',
    categoryLabel: 'Collares',
    collection: { id: 'juego-maria-swarovski', name: 'Juego María Swarovski' },
    type: { id: 'collar-maria-swarovski', name: 'Collar María Swarovski' },
    color: { name: 'Turquesa', code: 'S08' },
    size: 130,
    description: 'Collar María Swarovski artesanal en tono Turquesa, colección Juego María Swarovski.',
    longDescription:
      'El Collar María Swarovski en tono turquesa es una joya que captura la esencia del lujo artesanal peruano. La profunda tonalidad turquesa se entrelaza con cristales Swarovski genuinos para crear un efecto de luz y color que hipnotiza a quien lo contempla. Cada collar es tejido a mano con dedicación excepcional por nuestras artesanas, quienes dominan el arte de integrar cristales preciosos en estructuras textiles de una belleza insuperable. Con 130mm de longitud, se cierra con elegancia alrededor del cuello, transformando cualquier atuendo en un look de alta gama. La combinación de hilos premium, acabados en oro de 18k y la garantía de plata 925 hipoalergénica hacen de este collar una inversión en estilo y calidad que perdurará por años.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego María Swarovski',
      'Color: Turquesa (S08)',
      'Tamaño: 130mm',
      'Cristales Swarovski genuinos',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Cierre ajustable seguro',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 38,
    inStock: true,
  },
  {
    id: 11,
    slug: 'juego-maria-swarovski-juegos-maria-swarovski-morado',
    sku: 'JMR4S05',
    name: 'Juegos María Swarovski Morado',
    fullName: 'Juegos María Swarovski Morado — Juego María Swarovski',
    price: 160.0,
    image: '/products/juego-maria-swarovski/juegos-maria-swarovski/morado/morado-1.webp',
    imageSecondary: '/products/juego-maria-swarovski/juegos-maria-swarovski/morado/morado-1.webp',
    images: [
      {
        original: '/products/juego-maria-swarovski/juegos-maria-swarovski/morado/morado-1.webp',
        optimized: '/products/juego-maria-swarovski/juegos-maria-swarovski/morado/morado-1-800.webp',
        thumbnail: '/products/juego-maria-swarovski/juegos-maria-swarovski/morado/morado-1-thumb.webp',
      },
    ],
    category: 'juegos',
    categoryLabel: 'Juegos Completos',
    collection: { id: 'juego-maria-swarovski', name: 'Juego María Swarovski' },
    type: { id: 'juegos-maria-swarovski', name: 'Juegos María Swarovski' },
    color: { name: 'Morado', code: 'S05' },
    size: 240,
    description: 'Juegos María Swarovski artesanal en tono Morado, colección Juego María Swarovski.',
    longDescription:
      'Los Juegos María Swarovski en tono morado representan la cúspide de la colección Juego María Swarovski. Este set completo coordina aretes, collar y pulsera en una sinfonía de púrpura profundo adornada con cristales Swarovski genuinos que elevan cada pieza a la categoría de obra de arte. El morado, color asociado históricamente con la realeza y la exclusividad, confiere a este juego una presencia magnética que no pasa desapercibida. Con una pulsera de 240mm, el set está diseñado para adaptarse a diferentes complexiones con comodidad y estilo. Cada componente es tejido individualmente a mano por nuestras maestras artesanas, quienes invierten horas de trabajo para asegurar que cada cristal Swarovski esté perfectamente integrado en la estructura del tejido. Los acabados en oro de 18k y la plata 925 hipoalergénica garantizan durabilidad y confort excepcional.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego María Swarovski',
      'Color: Morado (S05)',
      'Tamaño: 240mm (juego completo)',
      'Set completo: Aretes + Collar + Pulsera',
      'Cristales Swarovski genuinos en cada pieza',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de lujo Maia Store',
    ],
    rating: 4.8,
    reviews: 63,
    inStock: true,
  },
  {
    id: 12,
    slug: 'juego-maria-swarovski-juegos-maria-swarovski-turquesa',
    sku: 'JMR4S08',
    name: 'Juegos María Swarovski Turquesa',
    fullName: 'Juegos María Swarovski Turquesa — Juego María Swarovski',
    price: 160.0,
    image: '/products/juego-maria-swarovski/juegos-maria-swarovski/turquesa/turquesa-1.webp',
    imageSecondary: '/products/juego-maria-swarovski/juegos-maria-swarovski/turquesa/turquesa-2.webp',
    images: [
      {
        original: '/products/juego-maria-swarovski/juegos-maria-swarovski/turquesa/turquesa-1.webp',
        optimized: '/products/juego-maria-swarovski/juegos-maria-swarovski/turquesa/turquesa-1-800.webp',
        thumbnail: '/products/juego-maria-swarovski/juegos-maria-swarovski/turquesa/turquesa-1-thumb.webp',
      },
      {
        original: '/products/juego-maria-swarovski/juegos-maria-swarovski/turquesa/turquesa-2.webp',
        optimized: '/products/juego-maria-swarovski/juegos-maria-swarovski/turquesa/turquesa-2-800.webp',
        thumbnail: '/products/juego-maria-swarovski/juegos-maria-swarovski/turquesa/turquesa-2-thumb.webp',
      },
    ],
    category: 'juegos',
    categoryLabel: 'Juegos Completos',
    collection: { id: 'juego-maria-swarovski', name: 'Juego María Swarovski' },
    type: { id: 'juegos-maria-swarovski', name: 'Juegos María Swarovski' },
    color: { name: 'Turquesa', code: 'S08' },
    size: 240,
    description: 'Juegos María Swarovski artesanal en tono Turquesa, colección Juego María Swarovski.',
    longDescription:
      'Los Juegos María Swarovski en turquesa son una celebración completa de la artesanía peruana fusionada con la excelencia de los cristales Swarovski. Este juego coordina aretes, collar y pulsera en una paleta de tonos turquesas que evocan la serenidad del mar tropical peruano. Cada pieza del set está trabajada individualmente con una dedicación que solo la artesanía hecha a mano puede ofrecer: los hilos premium se entrelazan con precisión para crear estructuras que sostienen y realzan los cristales Swarovski genuinos, produciendo un efecto lumínico cautivador. Con 240mm de tamaño total, el juego proporciona una experiencia de uso lujosa y cómoda. Los acabados en oro de 18k aportan calidez y distinción, mientras que la plata 925 hipoalergénica cuida de la sensibilidad de tu piel. Ideal para regalar o para darte un capricho especial.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego María Swarovski',
      'Color: Turquesa (S08)',
      'Tamaño: 240mm (juego completo)',
      'Set completo: Aretes + Collar + Pulsera',
      'Cristales Swarovski genuinos en cada pieza',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de lujo Maia Store',
    ],
    rating: 4.8,
    reviews: 34,
    inStock: true,
  },

  // ─── Juego Rosa Collection (13–15) ─────────────────────────

  {
    id: 13,
    slug: 'juego-rosa-aretes-rosa-pastel',
    sku: 'AROSCPT',
    name: 'Aretes Rosa Pastel',
    fullName: 'Aretes Rosa Pastel — Juego Rosa',
    price: 48.0,
    image: '/products/juego-rosa/aretes/rosa-pastel/rosa-pastel-1.webp',
    imageSecondary: '/products/juego-rosa/aretes/rosa-pastel/rosa-pastel-2.webp',
    images: [
      {
        original: '/products/juego-rosa/aretes/rosa-pastel/rosa-pastel-1.webp',
        optimized: '/products/juego-rosa/aretes/rosa-pastel/rosa-pastel-1-800.webp',
        thumbnail: '/products/juego-rosa/aretes/rosa-pastel/rosa-pastel-1-thumb.webp',
      },
      {
        original: '/products/juego-rosa/aretes/rosa-pastel/rosa-pastel-2.webp',
        optimized: '/products/juego-rosa/aretes/rosa-pastel/rosa-pastel-2-800.webp',
        thumbnail: '/products/juego-rosa/aretes/rosa-pastel/rosa-pastel-2-thumb.webp',
      },
    ],
    category: 'aretes',
    categoryLabel: 'Aretes',
    collection: { id: 'juego-rosa', name: 'Juego Rosa' },
    type: { id: 'aretes', name: 'Aretes' },
    color: { name: 'Rosa Pastel', code: null },
    size: 95,
    description: 'Aretes artesanal en tono Rosa Pastel, colección Juego Rosa.',
    longDescription:
      'Los Aretes Rosa Pastel de la colección Juego Rosa son una delicada expresión de feminidad y elegancia artesanal. Tejidos a mano en tonos rosa pastel tricolor, estos aretes presentan una combinación de matices suaves que crean profundidad visual y movimiento. Con 95mm de tamaño, ofrecen la presencia justa para ser notados sin abrumar, logrando un equilibrio perfecto entre sutileza y estilo. El diseño tricolor es característico de la colección Juego Rosa, donde cada tono de rosa se entrelaza para formar un patrón único que nuestras artesanas han perfeccionado con años de experiencia. Son el accesorio ideal para completar un look romántico o para añadir un toque de ternura a tu día cotidiano.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego Rosa',
      'Color: Rosa Pastel (Tricolor)',
      'Tamaño: 95mm',
      'Diseño tricolor exclusivo',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 29,
    inStock: true,
  },
  {
    id: 14,
    slug: 'juego-rosa-collar-rosa-pastel',
    sku: 'CROSCPT',
    name: 'Collar Rosa Pastel',
    fullName: 'Collar Rosa Pastel — Juego Rosa',
    price: 62.0,
    image: '/products/juego-rosa/collar/rosa-pastel/rosa-pastel-1.webp',
    imageSecondary: '/products/juego-rosa/collar/rosa-pastel/rosa-pastel-1.webp',
    images: [
      {
        original: '/products/juego-rosa/collar/rosa-pastel/rosa-pastel-1.webp',
        optimized: '/products/juego-rosa/collar/rosa-pastel/rosa-pastel-1-800.webp',
        thumbnail: '/products/juego-rosa/collar/rosa-pastel/rosa-pastel-1-thumb.webp',
      },
    ],
    category: 'collares',
    categoryLabel: 'Collares',
    collection: { id: 'juego-rosa', name: 'Juego Rosa' },
    type: { id: 'collar', name: 'Collar' },
    color: { name: 'Rosa Pastel', code: null },
    size: 95,
    description: 'Collar artesanal en tono Rosa Pastel, colección Juego Rosa.',
    longDescription:
      'El Collar Rosa Pastel es una pieza que irradia suavidad y sofisticación desde la colección Juego Rosa. Diseñado con la técnica tricolor característica de esta línea, entrelaza diferentes tonalidades de rosa pastel para crear un collar que se adapta con gracia a cualquier neckline. Con 95mm, se ajusta delicadamente al cuello aportando un toque de color y textura que enriquece cualquier ensemble. El tejido artesanal garantiza que cada collar sea una pieza única, con pequeñas variaciones que testimonian la mano humana detrás de su creación. Los acabados metálicos en oro de 18k y la base de plata 925 hipoalergénica aseguran que la belleza de este collar vaya acompañada de la máxima comodidad y durabilidad.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego Rosa',
      'Color: Rosa Pastel (Tricolor)',
      'Tamaño: 95mm',
      'Diseño tricolor exclusivo',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Cierre ajustable seguro',
      'Presentación en caja de regalo',
    ],
    rating: 4.9,
    reviews: 64,
    inStock: true,
  },
  {
    id: 15,
    slug: 'juego-rosa-juego-rosa-pastel',
    sku: 'JROSCPT',
    name: 'Juego Rosa Pastel',
    fullName: 'Juego Rosa Pastel — Juego Rosa',
    price: 138.0,
    image: '/products/juego-rosa/juego/rosa-pastel/rosa-pastel-1.webp',
    imageSecondary: '/products/juego-rosa/juego/rosa-pastel/rosa-pastel-2.webp',
    images: [
      {
        original: '/products/juego-rosa/juego/rosa-pastel/rosa-pastel-1.webp',
        optimized: '/products/juego-rosa/juego/rosa-pastel/rosa-pastel-1-800.webp',
        thumbnail: '/products/juego-rosa/juego/rosa-pastel/rosa-pastel-1-thumb.webp',
      },
      {
        original: '/products/juego-rosa/juego/rosa-pastel/rosa-pastel-2.webp',
        optimized: '/products/juego-rosa/juego/rosa-pastel/rosa-pastel-2-800.webp',
        thumbnail: '/products/juego-rosa/juego/rosa-pastel/rosa-pastel-2-thumb.webp',
      },
    ],
    category: 'juegos',
    categoryLabel: 'Juegos Completos',
    collection: { id: 'juego-rosa', name: 'Juego Rosa' },
    type: { id: 'juego', name: 'Juego' },
    color: { name: 'Rosa Pastel', code: null },
    size: 180,
    description: 'Juego artesanal en tono Rosa Pastel, colección Juego Rosa.',
    longDescription:
      'El Juego Rosa Pastel es una obra maestra de coordinación cromática y textil. Este set completo de la colección Juego Rosa reúne aretes, collar y pulsera en una armonía de tonos rosa pastel tricolor que crea un efecto visual envolvente y sofisticado. Cada pieza del juego está tejida individualmente a mano, con la técnica tricolor que define esta colección, donde múltiples tonalidades de rosa se entrelazan para crear profundidad y movimiento. Con 180mm de tamaño en el juego completo, ofrece un ajuste personalizable y cómodo. El conjunto está diseñado para usarse junto, creando un look coordinado y elegante que transiciona con naturalidad de una reunión diurna a una cena nocturna. Los acabados en oro de 18k y plata 925 garantizan que este juego sea una inversión de belleza duradera.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego Rosa',
      'Color: Rosa Pastel (Tricolor)',
      'Tamaño: 180mm (juego completo)',
      'Set completo: Aretes + Collar + Pulsera',
      'Diseño tricolor exclusivo',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de lujo Maia Store',
    ],
    rating: 5.0,
    reviews: 61,
    inStock: true,
  },

  // ─── Juego Rosario Collection (16–17) ───────────────────────

  {
    id: 16,
    slug: 'juego-rosario-aretes-verde-agua',
    sku: 'ARSAC13',
    name: 'Aretes Verde Agua',
    fullName: 'Aretes Verde Agua — Juego Rosario',
    price: 50.0,
    image: '/products/juego-rosario/aretes/verde-agua/verde-agua-1.webp',
    imageSecondary: '/products/juego-rosario/aretes/verde-agua/verde-agua-1.webp',
    images: [
      {
        original: '/products/juego-rosario/aretes/verde-agua/verde-agua-1.webp',
        optimized: '/products/juego-rosario/aretes/verde-agua/verde-agua-1-800.webp',
        thumbnail: '/products/juego-rosario/aretes/verde-agua/verde-agua-1-thumb.webp',
      },
    ],
    category: 'aretes',
    categoryLabel: 'Aretes',
    collection: { id: 'juego-rosario', name: 'Juego Rosario' },
    type: { id: 'aretes', name: 'Aretes' },
    color: { name: 'Verde Agua', code: 'C13' },
    size: 85,
    description: 'Aretes artesanal en tono Verde Agua, colección Juego Rosario.',
    longDescription:
      'Los Aretes Verde Agua de la colección Juego Rosario son una pieza que combina frescura y tradición artesanal en un solo accesorio. El verde agua, tono que recuerda las aguas cristalinas de los ríos andinos, aporta una vitalidad natural que ilumina el rostro de quien los lleva. Con 85mm de tamaño, estos aretes son compactos y ligeros, perfectos para un uso continuo sin fatiga. El diseño de la colección Juego Rosario se caracteriza por su patrón de tejido inspirado en las tradiciones religiosas y culturales peruanas, reinterpretado con un lenguaje estético contemporáneo. Cada arete es tejido a mano con hilo premium resistente al agua, garantizando que la belleza de la pieza se mantenga intacta con el paso del tiempo.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego Rosario',
      'Color: Verde Agua (C13)',
      'Tamaño: 85mm',
      'Diseño inspirado en tradiciones peruanas',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 4.9,
    reviews: 52,
    inStock: true,
  },
  {
    id: 17,
    slug: 'juego-rosario-aretes-verde-botella',
    sku: 'ARSAC15',
    name: 'Aretes Verde Botella',
    fullName: 'Aretes Verde Botella — Juego Rosario',
    price: 50.0,
    image: '/products/juego-rosario/aretes/verde-botella/verde-botella-1.webp',
    imageSecondary: '/products/juego-rosario/aretes/verde-botella/verde-botella-1.webp',
    images: [
      {
        original: '/products/juego-rosario/aretes/verde-botella/verde-botella-1.webp',
        optimized: '/products/juego-rosario/aretes/verde-botella/verde-botella-1-800.webp',
        thumbnail: '/products/juego-rosario/aretes/verde-botella/verde-botella-1-thumb.webp',
      },
    ],
    category: 'aretes',
    categoryLabel: 'Aretes',
    collection: { id: 'juego-rosario', name: 'Juego Rosario' },
    type: { id: 'aretes', name: 'Aretes' },
    color: { name: 'Verde Botella', code: 'C15' },
    size: 85,
    description: 'Aretes artesanal en tono Verde Botella, colección Juego Rosario.',
    longDescription:
      'Los Aretes Verde Botella de la colección Juego Rosario ofrecen una interpretación elegante y profunda del verde en la joyería artesanal. El tono verde botella, intenso y sofisticado, evoca la riqueza natural de los paisajes peruanos y aporta una presencia que equilibra entre lo audaz y lo refinado. Con 85mm de tamaño, estos aretes están diseñados para ser cómodos durante todo el día mientras aportan un toque distintivo a tu look. La colección Juego Rosario rinde homenaje a las artesanías devocionales peruanas, reinterpretando sus patrones en un contexto de moda contemporánea. Cada arete es tejido a mano por artesanas que dominan el arte de transformar hilo premium en piezas de belleza excepcional, con acabados en oro de 18k y base de plata 925 para máxima comodidad.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Juego Rosario',
      'Color: Verde Botella (C15)',
      'Tamaño: 85mm',
      'Diseño inspirado en tradiciones peruanas',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 35,
    inStock: true,
  },

  // ─── Pulsera Rombo Swarovski Collection (18–20) ────────────

  {
    id: 18,
    slug: 'pulsera-rombo-swarovski-morado',
    sku: 'PRB4S05',
    name: 'Pulsera Rombo Swarovski Morado',
    fullName: 'Pulsera Rombo Swarovski Morado — Pulsera Rombo Swarovski',
    price: 90.0,
    image: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/morado/morado-1.webp',
    imageSecondary: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/morado/morado-2.webp',
    images: [
      {
        original: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/morado/morado-1.webp',
        optimized: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/morado/morado-1-800.webp',
        thumbnail: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/morado/morado-1-thumb.webp',
      },
      {
        original: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/morado/morado-2.webp',
        optimized: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/morado/morado-2-800.webp',
        thumbnail: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/morado/morado-2-thumb.webp',
      },
    ],
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    collection: { id: 'pulsera-rombo-swarovski', name: 'Pulsera Rombo Swarovski' },
    type: { id: 'pulsera-rombo-swarovski', name: 'Pulsera Rombo Swarovski' },
    color: { name: 'Morado', code: 'S05' },
    size: 185,
    description: 'Pulsera Rombo Swarovski artesanal en tono Morado, colección Pulsera Rombo Swarovski.',
    longDescription:
      'La Pulsera Rombo Swarovski en morado es una declaración de lujo artesanal que fusiona la geometría del rombo con el brillo inigualable de los cristales Swarovski. Tejida a mano con hilo premium en profundo tono morado, esta pulsera presenta un patrón de rombos que crea una textura visual hipnótica, interrumpida estratégicamente por cristales Swarovski genuinos que capturan la luz desde múltiples ángulos. Con 185mm de longitud, ofrece un ajuste perfecto para la mayoría de muñecas, rodeándola de elegancia y color. El morado profundo es un tono que transmite misterio y sofisticación, ideal para quienes buscan un accesorio que sea verdaderamente especial. Los acabados en oro de 18k y la base de plata 925 hipoalergénica completan una pieza que es tan cómoda como impresionante.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Pulsera Rombo Swarovski',
      'Color: Morado (S05)',
      'Tamaño: 185mm',
      'Patrón geométrico rombo exclusivo',
      'Cristales Swarovski genuinos',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 40,
    inStock: true,
  },
  {
    id: 19,
    slug: 'pulsera-rombo-swarovski-rosado',
    sku: 'PRB4S03',
    name: 'Pulsera Rombo Swarovski Rosado',
    fullName: 'Pulsera Rombo Swarovski Rosado — Pulsera Rombo Swarovski',
    price: 90.0,
    image: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/rosado/rosado-1.webp',
    imageSecondary: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/rosado/rosado-2.webp',
    images: [
      {
        original: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/rosado/rosado-1.webp',
        optimized: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/rosado/rosado-1-800.webp',
        thumbnail: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/rosado/rosado-1-thumb.webp',
      },
      {
        original: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/rosado/rosado-2.webp',
        optimized: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/rosado/rosado-2-800.webp',
        thumbnail: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/rosado/rosado-2-thumb.webp',
      },
    ],
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    collection: { id: 'pulsera-rombo-swarovski', name: 'Pulsera Rombo Swarovski' },
    type: { id: 'pulsera-rombo-swarovski', name: 'Pulsera Rombo Swarovski' },
    color: { name: 'Rosado', code: 'S03' },
    size: 185,
    description: 'Pulsera Rombo Swarovski artesanal en tono Rosado, colección Pulsera Rombo Swarovski.',
    longDescription:
      'La Pulsera Rombo Swarovski en rosado encarna la dulzura del color combinada con la brillantez de los cristales Swarovski en una pieza de joyería artesanal excepcional. El patrón geométrico de rombos tejidos a mano crea una superficie rica en textura donde los cristales Swarovski genuinos se integran como puntos luminosos que despiertan con cada gesto de la muñeca. Con 185mm, la pulsera envuelve la muñeca con una presencia elegante pero ligera. El rosado suave es universalmente halagador y se adapta a cualquier tono de piel, convirtiendo esta pieza en una opción perfecta para uso diario o para ocasiones especiales. La artesanía premium se evidencia en cada detalle: desde el hilo resistente al agua hasta los acabados en oro de 18k y la base de plata 925 hipoalergénica que cuidan de tu piel.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Pulsera Rombo Swarovski',
      'Color: Rosado (S03)',
      'Tamaño: 185mm',
      'Patrón geométrico rombo exclusivo',
      'Cristales Swarovski genuinos',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 5.0,
    reviews: 35,
    inStock: true,
  },
  {
    id: 20,
    slug: 'pulsera-rombo-swarovski-turquesa',
    sku: 'PRB4S08',
    name: 'Pulsera Rombo Swarovski Turquesa',
    fullName: 'Pulsera Rombo Swarovski Turquesa — Pulsera Rombo Swarovski',
    price: 90.0,
    image: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/turquesa/turquesa-1.webp',
    imageSecondary: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/turquesa/turquesa-1.webp',
    images: [
      {
        original: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/turquesa/turquesa-1.webp',
        optimized: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/turquesa/turquesa-1-800.webp',
        thumbnail: '/products/pulsera-rombo-swarovski/pulsera-rombo-swarovski/turquesa/turquesa-1-thumb.webp',
      },
    ],
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    collection: { id: 'pulsera-rombo-swarovski', name: 'Pulsera Rombo Swarovski' },
    type: { id: 'pulsera-rombo-swarovski', name: 'Pulsera Rombo Swarovski' },
    color: { name: 'Turquesa', code: 'S08' },
    size: 185,
    description: 'Pulsera Rombo Swarovski artesanal en tono Turquesa, colección Pulsera Rombo Swarovski.',
    longDescription:
      'La Pulsera Rombo Swarovski en turquesa es una joya que combina la fascinante geometría del patrón rombo con la frescura seductora del color turquesa y el brillo supremo de los cristales Swarovski. Cada rombo tejido a mano crea una estructura tridimensional que da vida y movimiento a la pulsera, mientras los cristales Swarovski genuinos incrustados a mano añaden destellos de luz que transforman esta pieza en un centro de atención natural. Con 185mm de longitud, se ajusta con elegancia a cualquier muñeca, creando un contraste visual cautivador entre la geometría del tejido y la luminosidad de los cristales. La turquesa es un color que evoca frescura y sofisticación, perfecto para complementar looks veraniegos o para aportar un toque de color vibrante a outfits más neutros. Los acabados premium en oro de 18k y plata 925 garantizan una pieza de calidad excepcional.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Pulsera Rombo Swarovski',
      'Color: Turquesa (S08)',
      'Tamaño: 185mm',
      'Patrón geométrico rombo exclusivo',
      'Cristales Swarovski genuinos',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Presentación en caja de regalo',
    ],
    rating: 5.0,
    reviews: 60,
    inStock: true,
  },

  // ─── Pulsera Tubular Collection (21–23) ─────────────────────

  {
    id: 21,
    slug: 'pulsera-tubular-pulsera-tubular-jaspe-imperial',
    sku: 'PTBP1JI',
    name: 'Pulsera Tubular Jaspe Imperial',
    fullName: 'Pulsera Tubular Jaspe Imperial — Pulsera Tubular',
    price: 65.0,
    image: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-1.webp',
    imageSecondary: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-2.webp',
    images: [
      {
        original: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-1.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-1-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-1-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-2.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-2-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-2-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-3.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-3-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/jaspe-imperial/jaspe-imperial-3-thumb.webp',
      },
    ],
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    collection: { id: 'pulsera-tubular', name: 'Pulsera Tubular' },
    type: { id: 'pulsera-tubular', name: 'Pulsera Tubular' },
    color: { name: 'Jaspe Imperial', code: null },
    size: 120,
    description: 'Pulsera Tubular artesanal en tono Jaspe Imperial, colección Pulsera Tubular.',
    longDescription:
      'La Pulsera Tubular Jaspe Imperial es una pieza de joyería artesanal que rinde homenaje a la piedra de jaspe imperial, apreciada desde la antigüedad por su belleza terrosa y propiedades protectoras. Esta pulsera presenta un diseño tubular tejido a mano que recrea la textura y profundidad visual del jaspe, con vetas de color que se entrelazan creando un patrón orgánico y fascinante. Con 120mm de longitud, ofrece un ajuste elegante que se adapta con versatilidad a diferentes muñecas. La estructura tubular confiere a la pulsera una presencia volumétrica que la distingue de los diseños planos convencionales, aportando un look contemporáneo con raíces en la joyería natural. Cada pieza es tejida con hilo premium resistente al agua y acabados en oro de 18k sobre plata 925 hipoalergénica, garantizando que esta belleza artesanal perdure con el uso diario.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Pulsera Tubular',
      'Color: Jaspe Imperial',
      'Tamaño: 120mm',
      'Diseño tubular exclusivo con textura de jaspe',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Estructura volumétrica ligera y cómoda',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 40,
    inStock: true,
  },
  {
    id: 22,
    slug: 'pulsera-tubular-pulsera-tubular-rodocrosita',
    sku: 'PTBP1RC',
    name: 'Pulsera Tubular Rodocrosita',
    fullName: 'Pulsera Tubular Rodocrosita — Pulsera Tubular',
    price: 70.0,
    image: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-1.webp',
    imageSecondary: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-2.webp',
    images: [
      {
        original: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-1.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-1-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-1-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-2.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-2-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-2-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-3.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-3-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-3-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-4.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-4-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-4-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-5.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-5-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-5-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-6.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-6-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/rodocrosita/rodocrosita-6-thumb.webp',
      },
    ],
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    collection: { id: 'pulsera-tubular', name: 'Pulsera Tubular' },
    type: { id: 'pulsera-tubular', name: 'Pulsera Tubular' },
    color: { name: 'Rodocrosita', code: null },
    size: 120,
    description: 'Pulsera Tubular artesanal en tono Rodocrosita, colección Pulsera Tubular.',
    longDescription:
      'La Pulsera Tubular Rodocrosita es una joya inspirada en la hermosa piedra de rodocrosita, conocida como la piedra del amor y la compasión. Esta pulsera captura los característicos tonos rosados y salmón de la rodocrosita natural a través de un tejido tubular artesanal que recrea vetas y gradientes de color con extraordinaria fidelidad. Con 120mm de longitud, la estructura tubular ofrece un volumen sutil que envuelve la muñeca con suavidad, creando un accesorio que se siente tan bien como se ve. Cada pieza requiere un trabajo artesanal minucioso donde nuestras tejedoras entrelazan múltiples tonalidades de rosa para lograr el efecto visual de la rodocrosita auténtica. Los acabados en oro de 18k sobre plata 925 hipoalergénica aseguran que esta pulsera no solo sea una joya visualmente impactante sino también un placer de usar cada día.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Pulsera Tubular',
      'Color: Rodocrosita',
      'Tamaño: 120mm',
      'Diseño tubular exclusivo con vetas de color',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Estructura volumétrica ligera y cómoda',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 22,
    inStock: true,
  },
  {
    id: 23,
    slug: 'pulsera-tubular-pulsera-tubular-simple',
    sku: 'PTBLSP',
    name: 'Pulsera Tubular Simple',
    fullName: 'Pulsera Tubular Simple — Pulsera Tubular',
    price: 55.0,
    image: '/products/pulsera-tubular/pulsera-tubular/simple/simple-1.webp',
    imageSecondary: '/products/pulsera-tubular/pulsera-tubular/simple/simple-2.webp',
    images: [
      {
        original: '/products/pulsera-tubular/pulsera-tubular/simple/simple-1.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/simple/simple-1-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/simple/simple-1-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/simple/simple-2.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/simple/simple-2-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/simple/simple-2-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/simple/simple-3.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/simple/simple-3-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/simple/simple-3-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/simple/simple-4.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/simple/simple-4-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/simple/simple-4-thumb.webp',
      },
      {
        original: '/products/pulsera-tubular/pulsera-tubular/simple/simple-5.webp',
        optimized: '/products/pulsera-tubular/pulsera-tubular/simple/simple-5-800.webp',
        thumbnail: '/products/pulsera-tubular/pulsera-tubular/simple/simple-5-thumb.webp',
      },
    ],
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    collection: { id: 'pulsera-tubular', name: 'Pulsera Tubular' },
    type: { id: 'pulsera-tubular', name: 'Pulsera Tubular' },
    color: { name: 'Simple', code: null },
    size: 100,
    description: 'Pulsera Tubular artesanal en tono Simple, colección Pulsera Tubular.',
    longDescription:
      'La Pulsera Tubular Simple es la expresión más pura de la colección Pulsera Tubular, donde la belleza del diseño tubular artesanal brilla por sí misma sin adornos adicionales. Este modelo minimalista en esencia pero rico en textura, presenta un tejido tubular continuo que crea una superficie suave y uniforme con una presencia elegante y sofisticada. Con 100mm de longitud, es perfecta para quienes prefieren accesorios delicados con personalidad. La estructura tubular confiere volumen y forma sin peso excesivo, logrando un equilibrio ideal entre presencia visual y comodidad. Tejida a mano con hilos premium de alta resistencia, esta pulsera es un ejemplo perfecto de cómo la simplicidad bien ejecutada puede ser extraordinariamente bella. Los acabados en oro de 18k sobre plata 925 hipoalergénica garantizan calidad duradera y confort total en la piel.',
    features: [
      'Elaboración artesanal 100% a mano',
      'Colección: Pulsera Tubular',
      'Color: Simple (natural)',
      'Tamaño: 100mm',
      'Diseño tubular minimalista elegante',
      'Hilo premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Base hipoalergénica de plata 925',
      'Estructura volumétrica ultra ligera',
      'Presentación en caja de regalo',
    ],
    rating: 4.8,
    reviews: 22,
    inStock: true,
  },
  // ─── New Products (24–53) ───────────────
  // ─── Juego Flor de Plata Swarovski Collection (24–53) ───

  {
    id: 24,
    slug: "juego-flor-de-plata-swarovski-juego-flor-de-plata-swarovski-rombo-rombo",
    sku: "JFPSSWROM",
    name: "Juego Flor de Plata Swarovski Rombo",
    fullName: "Juego Flor de Plata Swarovski Rombo — Juego Flor de Plata Swarovski",
    price: 150,
    image: "/products/juego-flor-de-plata-swarovski/juego-flor-de-plata-swarovski-rombo/rombo/rombo-1.webp",
    imageSecondary: "/products/juego-flor-de-plata-swarovski/juego-flor-de-plata-swarovski-rombo/rombo/rombo-1-800.webp",
    images: [
      {
        original: "/products/juego-flor-de-plata-swarovski/juego-flor-de-plata-swarovski-rombo/rombo/rombo-1.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juego-flor-de-plata-swarovski-rombo/rombo/rombo-1-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juego-flor-de-plata-swarovski-rombo/rombo/rombo-1-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-flor-de-plata-swarovski", name: "Juego Flor de Plata Swarovski" },
    type: { id: "juego-flor-de-plata-swarovski-rombo", name: "Juego Flor de Plata Swarovski Rombo" },
    color: { name: "Rombo", code: "SWROM" },
    size: 175,
    description: "Juego Flor de Plata Swarovski Rombo artesanal, colección Juego Flor de Plata Swarovski.",
    longDescription: "Elegante juego flor de plata swarovski rombo artesanal. Parte de la exclusiva colección \"Juego Flor de Plata Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Flor de Plata Swarovski", "Color: Rombo", "Tamaño: 175mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 5,
    reviews: 27,
    inStock: true,
  },
  {
    id: 25,
    slug: "juego-flor-de-plata-swarovski-aretes-flor-de-plata-swarovski-modelo-1",
    sku: "AFPSCPYM01",
    name: "Aretes Flor de Plata Swarovski Modelo 1",
    fullName: "Aretes Flor de Plata Swarovski Modelo 1 — Juego Flor de Plata Swarovski",
    price: 75,
    image: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-1.webp",
    imageSecondary: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-2.webp",
    images: [
      {
        original: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-1.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-1-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-1-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-2.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-2-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-2-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-3.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-3-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-3-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-4.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-4-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-4-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-5.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-5-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-1/modelo-1-5-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-flor-de-plata-swarovski", name: "Juego Flor de Plata Swarovski" },
    type: { id: "aretes-flor-de-plata-swarovski", name: "Aretes Flor de Plata Swarovski" },
    color: { name: "Modelo 1", code: "M01" },
    size: 150,
    description: "Aretes Flor de Plata Swarovski artesanal, colección Juego Flor de Plata Swarovski.",
    longDescription: "Elegante aretes flor de plata swarovski artesanal. Parte de la exclusiva colección \"Juego Flor de Plata Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Flor de Plata Swarovski", "Color: Modelo 1", "Tamaño: 150mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 49,
    inStock: true,
  },
  {
    id: 26,
    slug: "juego-flor-de-plata-swarovski-aretes-flor-de-plata-swarovski-modelo-2",
    sku: "AFPSCPYM20",
    name: "Aretes Flor de Plata Swarovski Modelo 2",
    fullName: "Aretes Flor de Plata Swarovski Modelo 2 — Juego Flor de Plata Swarovski",
    price: 75,
    image: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-2/modelo-2-1.webp",
    imageSecondary: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-2/modelo-2-2.webp",
    images: [
      {
        original: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-2/modelo-2-1.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-2/modelo-2-1-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-2/modelo-2-1-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-2/modelo-2-2.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-2/modelo-2-2-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/aretes-flor-de-plata-swarovski/modelo-2/modelo-2-2-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-flor-de-plata-swarovski", name: "Juego Flor de Plata Swarovski" },
    type: { id: "aretes-flor-de-plata-swarovski", name: "Aretes Flor de Plata Swarovski" },
    color: { name: "Modelo 2", code: "M20" },
    size: 150,
    description: "Aretes Flor de Plata Swarovski artesanal, colección Juego Flor de Plata Swarovski.",
    longDescription: "Elegante aretes flor de plata swarovski artesanal. Parte de la exclusiva colección \"Juego Flor de Plata Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Flor de Plata Swarovski", "Color: Modelo 2", "Tamaño: 150mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 44,
    inStock: true,
  },
  {
    id: 27,
    slug: "juego-flor-de-plata-swarovski-collar-flor-de-plata-swarovski-modelo-1",
    sku: "CFPSCPYM01",
    name: "Collar Flor de Plata Swarovski Modelo 1",
    fullName: "Collar Flor de Plata Swarovski Modelo 1 — Juego Flor de Plata Swarovski",
    price: 85,
    image: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-1.webp",
    imageSecondary: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-2.webp",
    images: [
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-1.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-1-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-1-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-2.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-2-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-2-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-3.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-3-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-3-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-4.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-4-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-1/modelo-1-4-thumb.webp",
      }
    ],
    category: "collares",
    categoryLabel: "Collares",
    collection: { id: "juego-flor-de-plata-swarovski", name: "Juego Flor de Plata Swarovski" },
    type: { id: "collar-flor-de-plata-swarovski", name: "Collar Flor de Plata Swarovski" },
    color: { name: "Modelo 1", code: "M01" },
    size: 140,
    description: "Collar Flor de Plata Swarovski artesanal, colección Juego Flor de Plata Swarovski.",
    longDescription: "Elegante collar flor de plata swarovski artesanal. Parte de la exclusiva colección \"Juego Flor de Plata Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Flor de Plata Swarovski", "Color: Modelo 1", "Tamaño: 140mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 51,
    inStock: true,
  },
  {
    id: 28,
    slug: "juego-flor-de-plata-swarovski-collar-flor-de-plata-swarovski-modelo-2",
    sku: "CFPSCPYM20",
    name: "Collar Flor de Plata Swarovski Modelo 2",
    fullName: "Collar Flor de Plata Swarovski Modelo 2 — Juego Flor de Plata Swarovski",
    price: 85,
    image: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-1.webp",
    imageSecondary: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-2.webp",
    images: [
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-1.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-1-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-1-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-2.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-2-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-2-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-3.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-3-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-3-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-4.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-4-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-4-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-5.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-5-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-5-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-6.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-6-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/collar-flor-de-plata-swarovski/modelo-2/modelo-2-6-thumb.webp",
      }
    ],
    category: "collares",
    categoryLabel: "Collares",
    collection: { id: "juego-flor-de-plata-swarovski", name: "Juego Flor de Plata Swarovski" },
    type: { id: "collar-flor-de-plata-swarovski", name: "Collar Flor de Plata Swarovski" },
    color: { name: "Modelo 2", code: "M20" },
    size: 140,
    description: "Collar Flor de Plata Swarovski artesanal, colección Juego Flor de Plata Swarovski.",
    longDescription: "Elegante collar flor de plata swarovski artesanal. Parte de la exclusiva colección \"Juego Flor de Plata Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Flor de Plata Swarovski", "Color: Modelo 2", "Tamaño: 140mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 39,
    inStock: true,
  },
  {
    id: 29,
    slug: "juego-flor-de-plata-swarovski-juegos-flor-de-plata-swarovski-modelo-1",
    sku: "JFPSCPYM01",
    name: "Juegos Flor de Plata Swarovski Modelo 1",
    fullName: "Juegos Flor de Plata Swarovski Modelo 1 — Juego Flor de Plata Swarovski",
    price: 160,
    image: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-1.webp",
    imageSecondary: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-2.webp",
    images: [
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-1.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-1-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-1-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-2.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-2-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-2-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-3.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-3-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-1/modelo-1-3-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-flor-de-plata-swarovski", name: "Juego Flor de Plata Swarovski" },
    type: { id: "juegos-flor-de-plata-swarovski", name: "Juegos Flor de Plata Swarovski" },
    color: { name: "Modelo 1", code: "M01" },
    size: 260,
    description: "Juegos Flor de Plata Swarovski artesanal, colección Juego Flor de Plata Swarovski.",
    longDescription: "Elegante juegos flor de plata swarovski artesanal. Parte de la exclusiva colección \"Juego Flor de Plata Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Flor de Plata Swarovski", "Color: Modelo 1", "Tamaño: 260mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 40,
    inStock: true,
  },
  {
    id: 53,
    slug: "juego-flor-de-plata-swarovski-juegos-flor-de-plata-swarovski-modelo-2",
    sku: "JFPSCPYM20",
    name: "Juegos Flor de Plata Swarovski Modelo 2",
    fullName: "Juegos Flor de Plata Swarovski Modelo 2 — Juego Flor de Plata Swarovski",
    price: 160,
    image: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-1.webp",
    imageSecondary: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-2.webp",
    images: [
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-1.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-1-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-1-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-2.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-2-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-2-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-3.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-3-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-3-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-4.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-4-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-4-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-5.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-5-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-5-thumb.webp",
      },
      {
        original: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-6.webp",
        optimized: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-6-800.webp",
        thumbnail: "/products/juego-flor-de-plata-swarovski/juegos-flor-de-plata-swarovski/modelo-2/modelo-2-6-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-flor-de-plata-swarovski", name: "Juego Flor de Plata Swarovski" },
    type: { id: "juegos-flor-de-plata-swarovski", name: "Juegos Flor de Plata Swarovski" },
    color: { name: "Modelo 2", code: "M20" },
    size: 260,
    description: "Juegos Flor de Plata Swarovski Modelo 2, colección Juego Flor de Plata Swarovski.",
    longDescription: "Elegante juego completo de la colección Juego Flor de Plata Swarovski en su segunda variante.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Flor de Plata Swarovski", "Modelo 2", "Tamaño: 260mm", "Plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 22,
    inStock: true,
  },

  // ─── Juego Engaste Abierto Collection (30–31) ───

  {
    id: 30,
    slug: "juego-engaste-abierto-juego-engaste-abierto-rodocrosita-rodocrosita",
    sku: "JEAPRRC",
    name: "Juego Engaste Abierto Rodocrosita",
    fullName: "Juego Engaste Abierto Rodocrosita — Juego Engaste Abierto",
    price: 145,
    image: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-1.webp",
    imageSecondary: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-2.webp",
    images: [
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-1.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-1-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-1-thumb.webp",
      },
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-2.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-2-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-2-thumb.webp",
      },
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-3.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-3-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-3-thumb.webp",
      },
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-4.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-4-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-4-thumb.webp",
      },
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-5.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-5-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-5-thumb.webp",
      },
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-6.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-6-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-6-thumb.webp",
      },
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-7.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-7-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-rodocrosita/rodocrosita/rodocrosita-7-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-engaste-abierto", name: "Juego Engaste Abierto" },
    type: { id: "juego-engaste-abierto-rodocrosita", name: "Juego Engaste Abierto Rodocrosita" },
    color: { name: "Rodocrosita", code: null },
    size: 175,
    description: "Juego Engaste Abierto Rodocrosita artesanal, colección Juego Engaste Abierto.",
    longDescription: "Elegante juego engaste abierto rodocrosita artesanal. Parte de la exclusiva colección \"Juego Engaste Abierto\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Engaste Abierto", "Color: Rodocrosita", "Tamaño: 175mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 5,
    reviews: 50,
    inStock: true,
  },
  {
    id: 31,
    slug: "juego-engaste-abierto-juego-engaste-abierto-cuarzo-rosa-cuarzo-rosa",
    sku: "JCCRD03",
    name: "Juego Engaste Abierto Cuarzo Rosa",
    fullName: "Juego Engaste Abierto Cuarzo Rosa — Juego Engaste Abierto",
    price: 145,
    image: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-1.webp",
    imageSecondary: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-2.webp",
    images: [
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-1.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-1-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-1-thumb.webp",
      },
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-2.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-2-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-2-thumb.webp",
      },
      {
        original: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-3.webp",
        optimized: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-3-800.webp",
        thumbnail: "/products/juego-engaste-abierto/juego-engaste-abierto-cuarzo-rosa/cuarzo-rosa/cuarzo-rosa-3-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-engaste-abierto", name: "Juego Engaste Abierto" },
    type: { id: "juego-engaste-abierto-cuarzo-rosa", name: "Juego Engaste Abierto Cuarzo Rosa" },
    color: { name: "Cuarzo Rosa", code: null },
    size: 175,
    description: "Juego Engaste Abierto Cuarzo Rosa artesanal, colección Juego Engaste Abierto.",
    longDescription: "Elegante juego engaste abierto cuarzo rosa artesanal. Parte de la exclusiva colección \"Juego Engaste Abierto\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Engaste Abierto", "Color: Cuarzo Rosa", "Tamaño: 175mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 5,
    reviews: 39,
    inStock: true,
  },

  // ─── Dije Engaste Abierto Collection (32–32) ───

  {
    id: 32,
    slug: "dije-engaste-abierto-dije-engaste-abierto-piedra-corazon-cuarzo-rosa",
    sku: "DEAPC2CR",
    name: "Dije Engaste Corazón Cuarzo Rosa",
    fullName: "Dije Engaste Corazón Cuarzo Rosa — Dije Engaste Abierto",
    price: 55,
    image: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-1.webp",
    imageSecondary: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-2.webp",
    images: [
      {
        original: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-1.webp",
        optimized: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-1-800.webp",
        thumbnail: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-1-thumb.webp",
      },
      {
        original: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-2.webp",
        optimized: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-2-800.webp",
        thumbnail: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-2-thumb.webp",
      },
      {
        original: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-3.webp",
        optimized: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-3-800.webp",
        thumbnail: "/products/dije-engaste-abierto/dije-engaste-abierto-piedra-corazon/cuarzo-rosa/cuarzo-rosa-3-thumb.webp",
      }
    ],
    category: "dijes",
    categoryLabel: "Dijes",
    collection: { id: "dije-engaste-abierto", name: "Dije Engaste Abierto" },
    type: { id: "dije-engaste-abierto-piedra-corazon", name: "Dije Engaste Abierto Corazón" },
    color: { name: "Cuarzo Rosa", code: null },
    size: 125,
    description: "Dije Engaste Abierto Corazón artesanal, colección Dije Engaste Abierto.",
    longDescription: "Elegante dije engaste abierto corazón artesanal. Parte de la exclusiva colección \"Dije Engaste Abierto\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Dije Engaste Abierto", "Color: Cuarzo Rosa", "Tamaño: 125mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 35,
    inStock: true,
  },

  // ─── Aretes Corazón Abierto Swarovski Collection (33–34) ───

  {
    id: 33,
    slug: "aretes-corazon-abierto-swarovski-aretes-corazon-abierto-swarovski-modelo-1",
    sku: "ACASCM01",
    name: "Aretes Corazón Abierto Swarovski Modelo 1",
    fullName: "Aretes Corazón Abierto Swarovski Modelo 1 — Aretes Corazón Abierto Swarovski",
    price: 65,
    image: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-1.webp",
    imageSecondary: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-2.webp",
    images: [
      {
        original: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-1.webp",
        optimized: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-1-800.webp",
        thumbnail: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-1-thumb.webp",
      },
      {
        original: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-2.webp",
        optimized: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-2-800.webp",
        thumbnail: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-2-thumb.webp",
      },
      {
        original: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-3.webp",
        optimized: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-3-800.webp",
        thumbnail: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-1/modelo-1-3-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "aretes-corazon-abierto-swarovski", name: "Aretes Corazón Abierto Swarovski" },
    type: { id: "aretes-corazon-abierto-swarovski", name: "Aretes Corazón Abierto Swarovski" },
    color: { name: "Modelo 1", code: "M01" },
    size: 110,
    description: "Aretes Corazón Abierto Swarovski artesanal, colección Aretes Corazón Abierto Swarovski.",
    longDescription: "Elegante aretes corazón abierto swarovski artesanal. Parte de la exclusiva colección \"Aretes Corazón Abierto Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Aretes Corazón Abierto Swarovski", "Color: Modelo 1", "Tamaño: 110mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 37,
    inStock: true,
  },
  {
    id: 34,
    slug: "aretes-corazon-abierto-swarovski-aretes-corazon-abierto-swarovski-modelo-2",
    sku: "ACASCM12",
    name: "Aretes Corazón Abierto Swarovski Modelo 2",
    fullName: "Aretes Corazón Abierto Swarovski Modelo 2 — Aretes Corazón Abierto Swarovski",
    price: 65,
    image: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-2/modelo-2-1.webp",
    imageSecondary: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-2/modelo-2-2.webp",
    images: [
      {
        original: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-2/modelo-2-1.webp",
        optimized: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-2/modelo-2-1-800.webp",
        thumbnail: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-2/modelo-2-1-thumb.webp",
      },
      {
        original: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-2/modelo-2-2.webp",
        optimized: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-2/modelo-2-2-800.webp",
        thumbnail: "/products/aretes-corazon-abierto-swarovski/aretes-corazon-abierto-swarovski/modelo-2/modelo-2-2-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "aretes-corazon-abierto-swarovski", name: "Aretes Corazón Abierto Swarovski" },
    type: { id: "aretes-corazon-abierto-swarovski", name: "Aretes Corazón Abierto Swarovski" },
    color: { name: "Modelo 2", code: "M12" },
    size: 110,
    description: "Aretes Corazón Abierto Swarovski artesanal, colección Aretes Corazón Abierto Swarovski.",
    longDescription: "Elegante aretes corazón abierto swarovski artesanal. Parte de la exclusiva colección \"Aretes Corazón Abierto Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Aretes Corazón Abierto Swarovski", "Color: Modelo 2", "Tamaño: 110mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 5,
    reviews: 37,
    inStock: true,
  },

  // ─── Aretes Circular Collection (35–36) ───

  {
    id: 35,
    slug: "aretes-circular-aretes-circular-12-c08-y-c12",
    sku: "ACL2C08",
    name: "Aretes Circular 12 C08 y C12",
    fullName: "Aretes Circular 12 C08 y C12 — Aretes Circular",
    price: 40,
    image: "/products/aretes-circular/aretes-circular-12/c08-y-c12/c08-y-c12-1.webp",
    imageSecondary: "/products/aretes-circular/aretes-circular-12/c08-y-c12/c08-y-c12-1-800.webp",
    images: [
      {
        original: "/products/aretes-circular/aretes-circular-12/c08-y-c12/c08-y-c12-1.webp",
        optimized: "/products/aretes-circular/aretes-circular-12/c08-y-c12/c08-y-c12-1-800.webp",
        thumbnail: "/products/aretes-circular/aretes-circular-12/c08-y-c12/c08-y-c12-1-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "aretes-circular", name: "Aretes Circular" },
    type: { id: "aretes-circular-12", name: "Aretes Circular 12" },
    color: { name: "C08 y C12", code: null },
    size: 55,
    description: "Aretes Circular 12 artesanal, colección Aretes Circular.",
    longDescription: "Elegante aretes circular 12 artesanal. Parte de la exclusiva colección \"Aretes Circular\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Aretes Circular", "Color: C08 y C12", "Tamaño: 55mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 50,
    inStock: true,
  },
  {
    id: 36,
    slug: "aretes-circular-aretes-circular-12-c25-y-c26",
    sku: "ACL2C25",
    name: "Aretes Circular 12 C25 y C26",
    fullName: "Aretes Circular 12 C25 y C26 — Aretes Circular",
    price: 40,
    image: "/products/aretes-circular/aretes-circular-12/c25-y-c26/c25-y-c26-1.webp",
    imageSecondary: "/products/aretes-circular/aretes-circular-12/c25-y-c26/c25-y-c26-1-800.webp",
    images: [
      {
        original: "/products/aretes-circular/aretes-circular-12/c25-y-c26/c25-y-c26-1.webp",
        optimized: "/products/aretes-circular/aretes-circular-12/c25-y-c26/c25-y-c26-1-800.webp",
        thumbnail: "/products/aretes-circular/aretes-circular-12/c25-y-c26/c25-y-c26-1-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "aretes-circular", name: "Aretes Circular" },
    type: { id: "aretes-circular-12", name: "Aretes Circular 12" },
    color: { name: "C25 y C26", code: null },
    size: 55,
    description: "Aretes Circular 12 artesanal, colección Aretes Circular.",
    longDescription: "Elegante aretes circular 12 artesanal. Parte de la exclusiva colección \"Aretes Circular\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Aretes Circular", "Color: C25 y C26", "Tamaño: 55mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 26,
    inStock: true,
  },

  // ─── Juego Aro Atrapasueño Collection (37–42) ───

  {
    id: 37,
    slug: "juego-aro-atrapasueno-juego-aro-atrapasueno-celeste-y-rosado",
    sku: "JAATCYR",
    name: "Juego Aro Atrapasueño Celeste y Rosado",
    fullName: "Juego Aro Atrapasueño Celeste y Rosado — Juego Aro Atrapasueño",
    price: 120,
    image: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1.webp",
    imageSecondary: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1.webp",
        optimized: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1-800.webp",
        thumbnail: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-aro-atrapasueno", name: "Juego Aro Atrapasueño" },
    type: { id: "juego-aro-atrapasueno", name: "Juego Aro Atrapasueño" },
    color: { name: "Celeste y Rosado", code: null },
    size: 180,
    description: "Juego Aro Atrapasueño artesanal, colección Juego Aro Atrapasueño.",
    longDescription: "Elegante juego aro atrapasueño artesanal. Parte de la exclusiva colección \"Juego Aro Atrapasueño\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Atrapasueño", "Color: Celeste y Rosado", "Tamaño: 180mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 34,
    inStock: true,
  },
  {
    id: 38,
    slug: "juego-aro-atrapasueno-aretes-aro-atrapasueno-celeste-y-rosado",
    sku: "AAATCYR",
    name: "Aretes Aro Atrapasueño Celeste y Rosado",
    fullName: "Aretes Aro Atrapasueño Celeste y Rosado — Juego Aro Atrapasueño",
    price: 55,
    image: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1.webp",
    imageSecondary: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1.webp",
        optimized: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1-800.webp",
        thumbnail: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/celeste-y-rosado/celeste-y-rosado-1-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-aro-atrapasueno", name: "Juego Aro Atrapasueño" },
    type: { id: "aretes-aro-atrapasueno", name: "Aretes Aro Atrapasueño" },
    color: { name: "Celeste y Rosado", code: null },
    size: 100,
    description: "Aretes Aro Atrapasueño artesanal, colección Juego Aro Atrapasueño.",
    longDescription: "Elegante aretes aro atrapasueño artesanal. Parte de la exclusiva colección \"Juego Aro Atrapasueño\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Atrapasueño", "Color: Celeste y Rosado", "Tamaño: 100mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 5,
    reviews: 32,
    inStock: true,
  },
  {
    id: 39,
    slug: "juego-aro-atrapasueno-aretes-aro-atrapasueno-navideno-aretes",
    sku: "AAATNVD",
    name: "Aretes Aro Atrapasueño Navideño",
    fullName: "Aretes Aro Atrapasueño Navideño — Juego Aro Atrapasueño",
    price: 55,
    image: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/navideno/navideno-1.webp",
    imageSecondary: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/navideno/navideno-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/navideno/navideno-1.webp",
        optimized: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/navideno/navideno-1-800.webp",
        thumbnail: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/navideno/navideno-1-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-aro-atrapasueno", name: "Juego Aro Atrapasueño" },
    type: { id: "aretes-aro-atrapasueno", name: "Aretes Aro Atrapasueño" },
    color: { name: "Navideño", code: null },
    size: 100,
    description: "Aretes Aro Atrapasueño artesanal, colección Juego Aro Atrapasueño.",
    longDescription: "Elegante aretes aro atrapasueño artesanal. Parte de la exclusiva colección \"Juego Aro Atrapasueño\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Atrapasueño", "Color: Navideño", "Tamaño: 100mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 30,
    inStock: true,
  },
  {
    id: 40,
    slug: "juego-aro-atrapasueno-aretes-aro-atrapasueno-negro-y-tornasol",
    sku: "JAATNYT",
    name: "Aretes Aro Atrapasueño Negro y Tornasol",
    fullName: "Aretes Aro Atrapasueño Negro y Tornasol — Juego Aro Atrapasueño",
    price: 55,
    image: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/negro-y-tornasol/negro-y-tornasol-1.webp",
    imageSecondary: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/negro-y-tornasol/negro-y-tornasol-2.webp",
    images: [
      {
        original: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/negro-y-tornasol/negro-y-tornasol-1.webp",
        optimized: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/negro-y-tornasol/negro-y-tornasol-1-800.webp",
        thumbnail: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/negro-y-tornasol/negro-y-tornasol-1-thumb.webp",
      },
      {
        original: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/negro-y-tornasol/negro-y-tornasol-2.webp",
        optimized: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/negro-y-tornasol/negro-y-tornasol-2-800.webp",
        thumbnail: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/negro-y-tornasol/negro-y-tornasol-2-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-aro-atrapasueno", name: "Juego Aro Atrapasueño" },
    type: { id: "aretes-aro-atrapasueno", name: "Aretes Aro Atrapasueño" },
    color: { name: "Negro y Tornasol", code: null },
    size: 100,
    description: "Aretes Aro Atrapasueño artesanal, colección Juego Aro Atrapasueño.",
    longDescription: "Elegante aretes aro atrapasueño artesanal. Parte de la exclusiva colección \"Juego Aro Atrapasueño\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Atrapasueño", "Color: Negro y Tornasol", "Tamaño: 100mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 53,
    inStock: true,
  },
  {
    id: 41,
    slug: "juego-aro-atrapasueno-juego-aro-atrapasueno-rojo-y-tornasol",
    sku: "JAATRYT",
    name: "Juego Aro Atrapasueño Rojo y Tornasol",
    fullName: "Juego Aro Atrapasueño Rojo y Tornasol — Juego Aro Atrapasueño",
    price: 120,
    image: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/rojo-y-tornasol/rojo-y-tornasol-1.webp",
    imageSecondary: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/rojo-y-tornasol/rojo-y-tornasol-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/rojo-y-tornasol/rojo-y-tornasol-1.webp",
        optimized: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/rojo-y-tornasol/rojo-y-tornasol-1-800.webp",
        thumbnail: "/products/juego-aro-atrapasueno/juego-aro-atrapasueno/rojo-y-tornasol/rojo-y-tornasol-1-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-aro-atrapasueno", name: "Juego Aro Atrapasueño" },
    type: { id: "juego-aro-atrapasueno", name: "Juego Aro Atrapasueño" },
    color: { name: "Rojo y Tornasol", code: null },
    size: 180,
    description: "Juego Aro Atrapasueño artesanal, colección Juego Aro Atrapasueño.",
    longDescription: "Elegante juego aro atrapasueño artesanal. Parte de la exclusiva colección \"Juego Aro Atrapasueño\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Atrapasueño", "Color: Rojo y Tornasol", "Tamaño: 180mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 54,
    inStock: true,
  },
  {
    id: 42,
    slug: "juego-aro-atrapasueno-aretes-aro-atrapasueno-verde-y-menta",
    sku: "AAATVYM",
    name: "Aretes Aro Atrapasueño Verde y Menta",
    fullName: "Aretes Aro Atrapasueño Verde y Menta — Juego Aro Atrapasueño",
    price: 55,
    image: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/verde-y-menta/verde-y-menta-1.webp",
    imageSecondary: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/verde-y-menta/verde-y-menta-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/verde-y-menta/verde-y-menta-1.webp",
        optimized: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/verde-y-menta/verde-y-menta-1-800.webp",
        thumbnail: "/products/juego-aro-atrapasueno/aretes-aro-atrapasueno/verde-y-menta/verde-y-menta-1-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-aro-atrapasueno", name: "Juego Aro Atrapasueño" },
    type: { id: "aretes-aro-atrapasueno", name: "Aretes Aro Atrapasueño" },
    color: { name: "Verde y Menta", code: null },
    size: 100,
    description: "Aretes Aro Atrapasueño artesanal, colección Juego Aro Atrapasueño.",
    longDescription: "Elegante aretes aro atrapasueño artesanal. Parte de la exclusiva colección \"Juego Aro Atrapasueño\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Atrapasueño", "Color: Verde y Menta", "Tamaño: 100mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 45,
    inStock: true,
  },

  // ─── Juego Aro Vertical Mariposa Swarovski Collection (43–52) ───

  {
    id: 43,
    slug: "juego-aro-vertical-mariposa-swarovski-aretes-aro-vertical-mariposa-swarovski-naranja",
    sku: "AAVMSMG05",
    name: "Aretes Aro Vertical Mariposa Swarovski Naranja",
    fullName: "Aretes Aro Vertical Mariposa Swarovski Naranja — Juego Aro Vertical Mariposa Swarovski",
    price: 75,
    image: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/naranja/naranja-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/naranja/naranja-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/naranja/naranja-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/naranja/naranja-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/naranja/naranja-1-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "aretes-aro-vertical-mariposa-swarovski", name: "Aretes Aro Vertical Mariposa Swarovski" },
    color: { name: "Naranja", code: null },
    size: 120,
    description: "Aretes Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante aretes aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Naranja", "Tamaño: 120mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 37,
    inStock: true,
  },
  {
    id: 44,
    slug: "juego-aro-vertical-mariposa-swarovski-aretes-aro-vertical-mariposa-swarovski-rojo",
    sku: "AAVMSMG06",
    name: "Aretes Aro Vertical Mariposa Swarovski Rojo",
    fullName: "Aretes Aro Vertical Mariposa Swarovski Rojo — Juego Aro Vertical Mariposa Swarovski",
    price: 75,
    image: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-2.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-1-thumb.webp",
      },
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-2.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-2-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-2-thumb.webp",
      },
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-3.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-3-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-3-thumb.webp",
      },
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-4.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-4-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/rojo/rojo-4-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "aretes-aro-vertical-mariposa-swarovski", name: "Aretes Aro Vertical Mariposa Swarovski" },
    color: { name: "Rojo", code: null },
    size: 120,
    description: "Aretes Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante aretes aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Rojo", "Tamaño: 120mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 28,
    inStock: true,
  },
  {
    id: 45,
    slug: "juego-aro-vertical-mariposa-swarovski-aretes-aro-vertical-mariposa-swarovski-celeste",
    sku: "AAVMSMG11",
    name: "Aretes Aro Vertical Mariposa Swarovski Celeste",
    fullName: "Aretes Aro Vertical Mariposa Swarovski Celeste — Juego Aro Vertical Mariposa Swarovski",
    price: 75,
    image: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-2.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-1-thumb.webp",
      },
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-2.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-2-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-2-thumb.webp",
      },
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-3.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-3-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/aretes-aro-vertical-mariposa-swarovski/celeste/celeste-3-thumb.webp",
      }
    ],
    category: "aretes",
    categoryLabel: "Aretes",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "aretes-aro-vertical-mariposa-swarovski", name: "Aretes Aro Vertical Mariposa Swarovski" },
    color: { name: "Celeste", code: null },
    size: 120,
    description: "Aretes Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante aretes aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Celeste", "Tamaño: 120mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 44,
    inStock: true,
  },
  {
    id: 46,
    slug: "juego-aro-vertical-mariposa-swarovski-collar-aro-vertical-mariposa-swarovski-naranja",
    sku: "CAVMSMG05",
    name: "Collar Aro Vertical Mariposa Swarovski Naranja",
    fullName: "Collar Aro Vertical Mariposa Swarovski Naranja — Juego Aro Vertical Mariposa Swarovski",
    price: 85,
    image: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/naranja/naranja-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/naranja/naranja-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/naranja/naranja-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/naranja/naranja-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/naranja/naranja-1-thumb.webp",
      }
    ],
    category: "collares",
    categoryLabel: "Collares",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "collar-aro-vertical-mariposa-swarovski", name: "Collar Aro Vertical Mariposa Swarovski" },
    color: { name: "Naranja", code: null },
    size: 110,
    description: "Collar Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante collar aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Naranja", "Tamaño: 110mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 34,
    inStock: true,
  },
  {
    id: 47,
    slug: "juego-aro-vertical-mariposa-swarovski-collar-aro-vertical-mariposa-swarovski-rojo",
    sku: "CAVMSMG06",
    name: "Collar Aro Vertical Mariposa Swarovski Rojo",
    fullName: "Collar Aro Vertical Mariposa Swarovski Rojo — Juego Aro Vertical Mariposa Swarovski",
    price: 85,
    image: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/rojo/rojo-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/rojo/rojo-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/rojo/rojo-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/rojo/rojo-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/rojo/rojo-1-thumb.webp",
      }
    ],
    category: "collares",
    categoryLabel: "Collares",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "collar-aro-vertical-mariposa-swarovski", name: "Collar Aro Vertical Mariposa Swarovski" },
    color: { name: "Rojo", code: null },
    size: 110,
    description: "Collar Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante collar aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Rojo", "Tamaño: 110mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 5,
    reviews: 20,
    inStock: true,
  },
  {
    id: 48,
    slug: "juego-aro-vertical-mariposa-swarovski-collar-aro-vertical-mariposa-swarovski-celeste",
    sku: "CAVMSMG11",
    name: "Collar Aro Vertical Mariposa Swarovski Celeste",
    fullName: "Collar Aro Vertical Mariposa Swarovski Celeste — Juego Aro Vertical Mariposa Swarovski",
    price: 85,
    image: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/celeste/celeste-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/celeste/celeste-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/celeste/celeste-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/celeste/celeste-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/collar-aro-vertical-mariposa-swarovski/celeste/celeste-1-thumb.webp",
      }
    ],
    category: "collares",
    categoryLabel: "Collares",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "collar-aro-vertical-mariposa-swarovski", name: "Collar Aro Vertical Mariposa Swarovski" },
    color: { name: "Celeste", code: null },
    size: 110,
    description: "Collar Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante collar aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Celeste", "Tamaño: 110mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 33,
    inStock: true,
  },
  {
    id: 49,
    slug: "juego-aro-vertical-mariposa-swarovski-juego-aro-vertical-mariposa-swarovski-naranja",
    sku: "JAVMSMG05",
    name: "Juego Aro Vertical Mariposa Swarovski Naranja",
    fullName: "Juego Aro Vertical Mariposa Swarovski Naranja — Juego Aro Vertical Mariposa Swarovski",
    price: 160,
    image: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/naranja/naranja-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/naranja/naranja-2.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/naranja/naranja-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/naranja/naranja-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/naranja/naranja-1-thumb.webp",
      },
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/naranja/naranja-2.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/naranja/naranja-2-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/naranja/naranja-2-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    color: { name: "Naranja", code: null },
    size: 210,
    description: "Juego Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante juego aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Naranja", "Tamaño: 210mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 38,
    inStock: true,
  },
  {
    id: 50,
    slug: "juego-aro-vertical-mariposa-swarovski-juego-aro-vertical-mariposa-swarovski-rojo",
    sku: "JAVMSMG06",
    name: "Juego Aro Vertical Mariposa Swarovski Rojo",
    fullName: "Juego Aro Vertical Mariposa Swarovski Rojo — Juego Aro Vertical Mariposa Swarovski",
    price: 160,
    image: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-2.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-1-thumb.webp",
      },
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-2.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-2-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-2-thumb.webp",
      },
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-3.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-3-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rojo/rojo-3-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    color: { name: "Rojo", code: null },
    size: 210,
    description: "Juego Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante juego aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Rojo", "Tamaño: 210mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.9,
    reviews: 25,
    inStock: true,
  },
  {
    id: 51,
    slug: "juego-aro-vertical-mariposa-swarovski-juego-aro-vertical-mariposa-swarovski-rosado",
    sku: "JAVMSMG10",
    name: "Juego Aro Vertical Mariposa Swarovski Rosado",
    fullName: "Juego Aro Vertical Mariposa Swarovski Rosado — Juego Aro Vertical Mariposa Swarovski",
    price: 160,
    image: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rosado/rosado-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rosado/rosado-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rosado/rosado-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rosado/rosado-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/rosado/rosado-1-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    color: { name: "Rosado", code: null },
    size: 210,
    description: "Juego Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante juego aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Rosado", "Tamaño: 210mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 23,
    inStock: true,
  },
  {
    id: 52,
    slug: "juego-aro-vertical-mariposa-swarovski-juego-aro-vertical-mariposa-swarovski-celeste",
    sku: "JAVMSMG11",
    name: "Juego Aro Vertical Mariposa Swarovski Celeste",
    fullName: "Juego Aro Vertical Mariposa Swarovski Celeste — Juego Aro Vertical Mariposa Swarovski",
    price: 160,
    image: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/celeste/celeste-1.webp",
    imageSecondary: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/celeste/celeste-1-800.webp",
    images: [
      {
        original: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/celeste/celeste-1.webp",
        optimized: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/celeste/celeste-1-800.webp",
        thumbnail: "/products/juego-aro-vertical-mariposa-swarovski/juego-aro-vertical-mariposa-swarovski/celeste/celeste-1-thumb.webp",
      }
    ],
    category: "juegos",
    categoryLabel: "Juegos Completos",
    collection: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    type: { id: "juego-aro-vertical-mariposa-swarovski", name: "Juego Aro Vertical Mariposa Swarovski" },
    color: { name: "Celeste", code: null },
    size: 210,
    description: "Juego Aro Vertical Mariposa Swarovski artesanal, colección Juego Aro Vertical Mariposa Swarovski.",
    longDescription: "Elegante juego aro vertical mariposa swarovski artesanal. Parte de la exclusiva colección \"Juego Aro Vertical Mariposa Swarovski\", esta pieza es elaborada a mano con materiales premium, destacando los detalles característicos de la joyería peruana contemporánea.",
    features: ["Elaboración artesanal 100% a mano", "Colección: Juego Aro Vertical Mariposa Swarovski", "Color: Celeste", "Tamaño: 210mm", "Materiales premium importados", "Acabado profesional de lujo", "Base hipoalergénica de plata 925", "Presentación en caja de regalo"],
    rating: 4.8,
    reviews: 42,
    inStock: true,
  },

];

// ─── Categories ──────────────────────────────────────────────

export const categories: Category[] = [
  { id: 'todos', label: 'Todos', slug: 'coleccion', count: products.length },
  {
    id: 'juegos',
    label: 'Juegos Completos',
    slug: 'coleccion/categoria/juegos',
    count: products.filter((p) => p.category === 'juegos').length,
  },
  {
    id: 'pulseras',
    label: 'Pulseras',
    slug: 'coleccion/categoria/pulseras',
    count: products.filter((p) => p.category === 'pulseras').length,
  },
  {
    id: 'aretes',
    label: 'Aretes',
    slug: 'coleccion/categoria/aretes',
    count: products.filter((p) => p.category === 'aretes').length,
  },
  {
    id: 'collares',
    label: 'Collares',
    slug: 'coleccion/categoria/collares',
    count: products.filter((p) => p.category === 'collares').length,
  },
];

// ─── Testimonials ────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    name: 'Carla M.',
    location: 'Lima, Perú',
    text: 'Las joyas de Maia Store son increíbles. El juego completo que me compré en tono rosado es precioso y recibo cumplidos siempre que lo uso. La calidad del tejido y los materiales es notable. ¡Totalmente recomendado para quien busca algo único y especial!',
    rating: 5,
  },
  {
    name: 'Lucía R.',
    location: 'Arequipa, Perú',
    text: 'Me encantó la atención personalizada por WhatsApp. Me ayudaron a elegir el regalo perfecto para mi mamá. La presentación en caja de lujo fue el detalle que faltaba. La calidad es excepcional, se nota que cada pieza está hecha con amor.',
    rating: 5,
  },
  {
    name: 'Andrea P.',
    location: 'Cusco, Perú',
    text: 'Compré las pulseras para mis amigas y a todas les encantaron. El tejido es perfecto y los colores son preciosos. ¡Ya estoy esperando que tengan nuevos modelos para ampliar mi colección!',
    rating: 5,
  },
  {
    name: 'María José L.',
    location: 'Trujillo, Perú',
    text: 'Pedí los aretes Botón en crema y superaron mis expectativas. Son ligeros, elegantes y el tono crema combina con absolutamente todo. Ya estoy esperando que tengan nuevos modelos para ampliar mi colección.',
    rating: 5,
  },
  {
    name: 'Valentina S.',
    location: 'Piura, Perú',
    text: 'El envío fue súper rápido a Piura y el empaque impecable. La pulsera verde botella es exactamente como la vi en las fotos. Perfecta para el verano. Estoy encantada con mi compra y con el servicio.',
    rating: 5,
  },
  {
    name: 'Daniela C.',
    location: 'Chiclayo, Perú',
    text: 'Compré el juego completo para mi novia y no pudo estar más feliz. El set coordinado es exquisito y el ajuste perfecto en cada pieza. Maia Store ha ganado un cliente fiel.',
    rating: 5,
  },
];

// ─── Payment Methods ─────────────────────────────────────────

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'whatsapp',
    title: 'WhatsApp Directo',
    description:
      'Haz tu pedido directamente por WhatsApp y recibe atención personalizada. Te enviamos fotos reales, precios actualizados y confirmación de disponibilidad al instante. Es la forma más rápida y directa de comprar.',
    cta: 'Chatear Ahora',
    href: 'https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Quisiera%20hacer%20un%20pedido',
    steps: [
      'Escríbenos por WhatsApp al +51 977 333 858',
      'Cuéntanos qué pieza te interesa o pide asesoría',
      'Te enviamos fotos, precio y disponibilidad',
      'Confirma tu pedido y método de pago',
      'Recibe tu joya en la puerta de tu casa',
    ],
  },
  {
    id: 'tarjeta',
    title: 'Tarjeta de Crédito/Débito',
    description:
      'Paga de forma segura con tu tarjeta Visa, Mastercard o American Express a través de nuestra pasarela de pagos en línea certificada con encriptación SSL de 256 bits. Tus datos están 100% protegidos.',
    cta: 'Pagar en Línea',
    href: '#',
    steps: [
      'Selecciona la joya que deseas comprar',
      'Elige "Pagar con Tarjeta" como método',
      'Ingresa los datos de tu tarjeta de forma segura',
      'Recibe confirmación de pago al instante',
      'Preparamos tu envío de inmediato',
    ],
  },
  {
    id: 'yape-plin',
    title: 'Yape / Plin',
    description:
      'Transferencias instantáneas a través de Yape o Plin, las plataformas de pago móvil más populares del Perú. Solo escanea el código QR o realiza la transferencia directamente desde tu celular.',
    cta: 'Escanear QR',
    href: '#',
    steps: [
      'Confirma tu pedido por WhatsApp',
      'Te enviamos el código QR de Yape/Plin',
      'Escanea y realiza la transferencia',
      'Envíanos el comprobante por chat',
      'Procesamos tu pedido de inmediato',
    ],
  },
  {
    id: 'transferencia',
    title: 'Transferencia Bancaria',
    description:
      'Realiza tu pago por transferencia bancaria a nuestras cuentas en BCP, Interbank o Banco de la Nación. Una vez confirmada la transferencia, envíanos el comprobante por WhatsApp para procesar tu pedido.',
    cta: 'Ver Cuentas',
    href: 'https://wa.me/51977333858?text=Hola!%20Necesito%20los%20datos%20para%20transferencia%20bancaria',
    steps: [
      'Solicita los datos bancarios por WhatsApp',
      'Realiza la transferencia desde tu banca',
      'Envía la captura del comprobante',
      'Verificamos el depósito (puede tomar 1-2 horas)',
      'Despachamos tu pedido una vez confirmado',
    ],
  },
];

// ─── Helper Functions ────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === 'todos') return products;
  return products.filter((p) => p.category === categoryId);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collection.id === collectionId);
}

export function getProductVariants(currentProduct: Product): Product[] {
  // Group by same collection + same type (different colors are variants)
  return products.filter(
    (p) =>
      p.collection.id === currentProduct.collection.id &&
      p.type.id === currentProduct.type.id
  );
}

export function getRelatedProducts(currentId: number, limit = 4): Product[] {
  const current = products.find((p) => p.id === currentId);
  if (!current) return products.slice(0, limit);
  const sameCategory = products.filter(
    (p) => p.category === current.category && p.id !== currentId
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = products.filter(
    (p) => p.category !== current.category && p.id !== currentId
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function formatPrice(price: number): string {
  return `S/. ${price.toFixed(2)}`;
}

export function generateWhatsAppLink(product: Product): string {
  const message = encodeURIComponent(
    `¡Hola Maia Store! 🌟\n\nMe interesa la siguiente joya:\n\n📦 ${product.fullName}\n🏷️ SKU: ${product.sku}\n💰 ${formatPrice(product.price)}\n\n¿Está disponible?`
  );
  return `https://wa.me/51977333858?text=${message}`;
}

export function generateWhatsAppGeneral(): string {
  return 'https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Quisiera%20hacer%20una%20consulta';
}

// ─── Bank Accounts ────────────────────────────────────────────

export const bankAccounts: BankAccount[] = [
  {
    bank: 'BCP',
    accountType: 'Cuenta Corriente en Soles',
    number: '193-2845671-0-42',
    holder: 'Maia Store E.I.R.L.',
    logo: '🏦',
  },
  {
    bank: 'Interbank',
    accountType: 'Cuenta Ahorro en Soles',
    number: '2001-0056-7890-12',
    holder: 'Maia Store E.I.R.L.',
    logo: '🏦',
  },
  {
    bank: 'Banco de la Nación',
    accountType: 'Cuenta Corriente Nacional',
    number: '00-067-123456',
    holder: 'Maia Store E.I.R.L.',
    logo: '🏦',
  },
];

// ─── QR Payments (Yape / Plin) ──────────────────────────────

export const qrPayments: QRPayment[] = [
  {
    id: 'yape',
    label: 'Yape',
    color: '#742DB5',
    bgColor: 'bg-purple-600',
    number: '999 888 777',
    holder: 'Maia Store E.I.R.L.',
  },
  {
    id: 'plin',
    label: 'Plin',
    color: '#00C853',
    bgColor: 'bg-green-500',
    number: '999 888 777',
    holder: 'Maia Store E.I.R.L.',
  },
];
