'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { MessageCircle, Eye, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Pulsera Turquesa Élite',
    price: 85.00,
    image: '/images/product-1.jpg',
    category: 'pulseras',
    description: 'Pulsera tejida a mano con hilo turquesa y acabado en oro.',
  },
  {
    id: 2,
    name: 'Collar Bohemio Real',
    price: 120.00,
    image: '/images/product-2.jpg',
    category: 'collares',
    description: 'Collar artesanal con cuentas de cristal y diseño único.',
  },
  {
    id: 3,
    name: 'Aretes Danza del Viento',
    price: 65.00,
    image: '/images/product-3.jpg',
    category: 'aretes',
    description: 'Aretes delicados tejidos con técnica macramé peruana.',
  },
  {
    id: 4,
    name: 'Anillo Primavera',
    price: 45.00,
    image: '/images/product-4.jpg',
    category: 'anillos',
    description: 'Anillo tejido con detalle floral en hilo premium.',
  },
  {
    id: 5,
    name: 'Tobillera Ondas del Mar',
    price: 75.00,
    image: '/images/product-5.jpg',
    category: 'pulseras',
    description: 'Tobillera inspirada en las olas del Pacífico peruano.',
  },
  {
    id: 6,
    name: 'Pulsera Encanto Andino',
    price: 95.00,
    image: '/images/product-6.jpg',
    category: 'pulseras',
    description: 'Pulsera con charms artesanales y tejido especial.',
  },
];

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'pulseras', label: 'Pulseras' },
  { id: 'collares', label: 'Collares' },
  { id: 'aretes', label: 'Aretes' },
  { id: 'anillos', label: 'Anillos' },
];

export default function ProductGallery() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const filteredProducts =
    activeCategory === 'todos'
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const formatPrice = (price: number) =>
    `S/. ${price.toFixed(2)}`;

  const handleWhatsApp = (product: Product) => {
    const message = encodeURIComponent(
      `¡Hola Maia Store! 🌟\n\nMe interesa la siguiente joya:\n\n📦 ${product.name}\n💰 ${formatPrice(product.price)}\n\n¿Está disponible?`
    );
    window.open(`https://wa.me/51977333858?text=${message}`, '_blank');
  };

  return (
    <section id="coleccion" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-turquoise-50/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-600 mb-4"
          >
            Catálogo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Nuestra{' '}
            <span className="text-gradient-turquoise">Colección</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-foreground/60 max-w-2xl mx-auto"
          >
            Explora nuestras piezas artesanales. Cada joya es única y está lista para ser tuya.
          </motion.p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-turquoise-500/25'
                  : 'bg-turquoise-50 text-turquoise-700 hover:bg-turquoise-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="product-card group relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-2xl hover:shadow-turquoise-500/10">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-turquoise-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Quick Actions Overlay */}
                    <AnimatePresence>
                      {hoveredProduct === product.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-4 left-4 right-4 flex gap-2"
                        >
                          <button
                            onClick={() => handleWhatsApp(product)}
                            className="flex-1 flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm text-turquoise-600 py-3 rounded-xl font-semibold text-sm hover:bg-white transition-colors shadow-lg"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Pedir
                          </button>
                          <button
                            onClick={() => handleWhatsApp(product)}
                            className="flex items-center justify-center bg-primary text-white w-12 rounded-xl hover:bg-turquoise-600 transition-colors shadow-lg"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-turquoise-700 capitalize">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-turquoise-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-foreground/50 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      <motion.button
                        onClick={() => handleWhatsApp(product)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-turquoise-600 hover:text-turquoise-700 transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Comprar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Quisiera%20ver%20toda%20la%20colección%20completa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-turquoise-500/25 hover:shadow-turquoise-500/40 transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5" />
            Ver Colección Completa
          </a>
        </motion.div>
      </div>
    </section>
  );
}
