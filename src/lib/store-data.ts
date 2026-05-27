// ============================================================
// Maia Store — Shared Data Layer
// Products, categories, testimonials, payment methods, etc.
// ============================================================

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categoryLabel: string;
  description: string;
  longDescription: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
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

// ─── Products ────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: 1,
    slug: 'pulsera-turquesa-elite',
    name: 'Pulsera Turquesa Élite',
    price: 85.0,
    image: '/images/product-1.webp',
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    description: 'Pulsera tejida a mano con hilo turquesa y acabado en oro.',
    longDescription:
      'La Pulsera Turquesa Élite es una de nuestras piezas más emblemáticas. Tejida completamente a mano por nuestras artesanas expertas, utiliza hilo de algodón premium de alta resistencia en tono turquesa profundo, combinado con un acabado metálico en oro de 18 quilates que aporta un toque de sofisticación sin igual. Su diseño de tejido en espiral simboliza la conexión eterna y la fuerza interior de quien la porta. Cada pieza requiere aproximadamente 4 horas de trabajo minucioso, donde cada puntada se realiza con precisión milimétrica para garantizar un acabado perfecto.',
    features: [
      'Hilo de algodón premium resistente al agua',
      'Acabado metálico en oro de 18k',
      'Cierre ajustable magnético',
      'Aprox. 4 horas de tejido artesanal',
      'Presentación en caja de lujo',
    ],
    rating: 4.9,
    reviews: 47,
    inStock: true,
  },
  {
    id: 2,
    slug: 'collar-bohemio-real',
    name: 'Collar Bohemio Real',
    price: 120.0,
    image: '/images/product-2.webp',
    category: 'collares',
    categoryLabel: 'Collares',
    description: 'Collar artesanal con cuentas de cristal y diseño único.',
    longDescription:
      'El Collar Bohemio Real es una obra maestra de la joyería artesanal peruana. Su diseño combina cuentas de cristal de Bohemia importadas con un tejido macramé en hilo encerado que crea un patrón geométrico hipnótico. Inspirado en los纺织品 ancestrales de las culturas precolombinas, este collar es una declaración de estilo que conecta la tradición con la modernidad. La longitud ajustable permite usarlo tanto como collar corto como largo, adaptándose a cualquier ocasión y estilo personal.',
    features: [
      'Cuentas de cristal de Bohemia genuinas',
      'Tejido macramé con hilo encerado',
      'Longitud ajustable (40-70 cm)',
      'Cierre artesanal de plata 925',
      'Certificado de autenticidad incluido',
    ],
    rating: 5.0,
    reviews: 62,
    inStock: true,
  },
  {
    id: 3,
    slug: 'aretes-danza-del-viento',
    name: 'Aretes Danza del Viento',
    price: 65.0,
    image: '/images/product-3.webp',
    category: 'aretes',
    categoryLabel: 'Aretes',
    description: 'Aretes delicados tejidos con técnica macramé peruana.',
    longDescription:
      'Los Aretes Danza del Viento capturan la esencia ligera y fluida de la brisa costera peruana. Elaborados con la técnica de macramé micro tejido, cada arete presenta un diseño de plumas estilizadas que se mueven suavemente con cada paso. Los hilos utilizados son de fibra natural teñida a mano con tintes vegetales, garantizando colores vibrantes que perduran en el tiempo. Su peso ultraligero los hace cómodos para uso diario, mientras que su diseño los convierte en la pieza perfecta para ocasiones especiales.',
    features: [
      'Técnica de micro macramé artesanal',
      'Hilos de fibra natural con tintes vegetales',
      'Peso ultraligero (5g por arete)',
      'Base de plata 925 hipoalergénica',
      'Diseño movimiento fluido natural',
    ],
    rating: 4.8,
    reviews: 35,
    inStock: true,
  },
  {
    id: 4,
    slug: 'anillo-primavera',
    name: 'Anillo Primavera',
    price: 45.0,
    image: '/images/product-4.webp',
    category: 'anillos',
    categoryLabel: 'Anillos',
    description: 'Anillo tejido con detalle floral en hilo premium.',
    longDescription:
      'El Anillo Primavera es una celebración de la naturaleza y la renovación. Su diseño presenta un delicado motivo floral tejido a mano con hilo de seda premium, creando un patrón tridimensional que parece florecer sobre el dedo. La base del anillo está reforzada con un alambre de plata flexible que garantiza durabilidad sin sacrificar comodidad. Disponible en tallas ajustables, este anillo es perfecto para regalar o para consentirse con una pieza única que refleja la belleza de la artesanía peruana.',
    features: [
      'Hilo de seda premium importado',
      'Diseño floral tridimensional',
      'Talla ajustable (adaptable)',
      'Base de plata flexible 925',
      'Acabado protector anti-desgaste',
    ],
    rating: 4.7,
    reviews: 28,
    inStock: true,
  },
  {
    id: 5,
    slug: 'tobillera-ondas-del-mar',
    name: 'Tobillera Ondas del Mar',
    price: 75.0,
    image: '/images/product-5.webp',
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    description: 'Tobillera inspirada en las olas del Pacífico peruano.',
    longDescription:
      'La Tobillera Ondas del Mar rinde homenaje a las costas del Pacífico peruano. Diseñada con un patrón ondulado que replica el movimiento natural de las olas, esta pieza combina hilo de nailon marino de alta resistencia con cuentas de madera natural talladas a mano. Su cierre de ajuste permite una worn cómoda y segura, ideal para usar en la playa, en el día a día o en noches de verano. Cada cuenta de madera está tratada con aceites naturales que realzan la veta única de cada pieza, haciendo que ninguna tobillera sea igual a otra.',
    features: [
      'Hilo de nailon marino ultra resistente',
      'Cuentas de madera natural talladas',
      'Cierre de ajuste personalizable',
      'Tratamiento con aceites naturales',
      'Resistente al agua y al sol',
    ],
    rating: 4.9,
    reviews: 41,
    inStock: true,
  },
  {
    id: 6,
    slug: 'pulsera-encanto-andino',
    name: 'Pulsera Encanto Andino',
    price: 95.0,
    image: '/images/product-6.webp',
    category: 'pulseras',
    categoryLabel: 'Pulseras',
    description: 'Pulsera con charms artesanales y tejido especial.',
    longDescription:
      'La Pulsera Encanto Andino es la fusión perfecta entre la joyería contemporánea y el legado cultural peruano. Su base está tejida con la técnica de telar de cintura, una tradición ancestral andina que nuestras artesanas han adaptado a escala miniatura. Los charms que la adornan son piezas de plata 925 fundidas y pulidas a mano, representando símbolos sagrados de la cultura andina como la chacana (cruz cuadrada), el cóndor y la pachamama. Cada pulsera viene acompañada de una tarjeta que explica el significado de cada símbolo, convirtiéndola en una pieza con profundo valor cultural.',
    features: [
      'Técnica de telar de cintura ancestral',
      'Charms de plata 925 fundidos a mano',
      'Símbolos sagrados andinos auténticos',
      'Tarjeta explicativa del significado',
      'Edición limitada y numerada',
    ],
    rating: 5.0,
    reviews: 53,
    inStock: true,
  },
];

// ─── Categories ──────────────────────────────────────────────

export const categories: Category[] = [
  { id: 'todos', label: 'Todos', slug: 'coleccion', count: products.length },
  {
    id: 'pulseras',
    label: 'Pulseras',
    slug: 'coleccion/categoria/pulseras',
    count: products.filter((p) => p.category === 'pulseras').length,
  },
  {
    id: 'collares',
    label: 'Collares',
    slug: 'coleccion/categoria/collares',
    count: products.filter((p) => p.category === 'collares').length,
  },
  {
    id: 'aretes',
    label: 'Aretes',
    slug: 'coleccion/categoria/aretes',
    count: products.filter((p) => p.category === 'aretes').length,
  },
  {
    id: 'anillos',
    label: 'Anillos',
    slug: 'coleccion/categoria/anillos',
    count: products.filter((p) => p.category === 'anillos').length,
  },
];

// ─── Testimonials ────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    name: 'Carla M.',
    location: 'Lima, Perú',
    text: 'Las joyas de Maia Store son increíbles. El collar que me compré es precioso y recibo cumplidos siempre que lo uso. La calidad del tejido y los materiales es notable. ¡Totalmente recomendado para quien busca algo único y especial!',
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
    text: 'Compré las pulseras para mis amigas y a todas les encantaron. El tejido es perfecto y los colores son preciosos. Además, la tarjeta explicativa de los símbolos andinos de la Pulsera Encanto fue un detalle hermoso. ¡Volveré a comprar!',
    rating: 5,
  },
  {
    name: 'María José L.',
    location: 'Trujillo, Perú',
    text: 'Pedí los aretes Danza del Viento y superaron mis expectativas. Son ligeros, elegantes y el movimiento de las plumitas es hipnótico. Ya estoy esperando que tengan nuevos modelos para ampliar mi colección.',
    rating: 5,
  },
  {
    name: 'Valentina S.',
    location: 'Piura, Perú',
    text: 'El envío fue súper rápido a Piura y el empaque impecable. La tobillera Ondas del Mar es exactamente como la vi en las fotos. Perfecta para el verano. Estoy encantada con mi compra y con el servicio.',
    rating: 5,
  },
  {
    name: 'Daniela C.',
    location: 'Chiclayo, Perú',
    text: 'Compré el Anillo Primavera para mi novia y no pudo estar más feliz. El detalle floral es exquisito y el ajuste perfecto. Maia Store ha ganado un cliente fiel, sin duda la mejor tienda de joyería artesanal del país.',
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
    `¡Hola Maia Store! 🌟\n\nMe interesa la siguiente joya:\n\n📦 ${product.name}\n💰 ${formatPrice(product.price)}\n\n¿Está disponible?`
  );
  return `https://wa.me/51977333858?text=${message}`;
}

export function generateWhatsAppGeneral(): string {
  return 'https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Quisiera%20hacer%20una%20consulta';
}
