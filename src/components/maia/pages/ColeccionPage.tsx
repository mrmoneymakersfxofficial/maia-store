'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { products, categories, getProductsByCategory, formatPrice, generateWhatsAppLink } from '@/lib/store-data';

gsap.registerPlugin(ScrollTrigger);

export default function ColeccionPage() {
  const { route, navigate } = useRouter();
  const activeCategory = route.params?.category || 'todos';
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const filteredProducts = getProductsByCategory(activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory]);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'todos') {
      navigate('#/coleccion');
    } else {
      navigate(`#/coleccion/categoria/${catId}`);
    }
  };

  return (
    <div ref={sectionRef} className="relative pt-32 pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-turquoise-50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-600 mb-4">
            Catálogo Completo
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Nuestra <span className="text-gradient-turquoise">Colección</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Explora nuestras piezas artesanales. Cada joya es única, hecha a mano y está lista para ser tuya.
          </motion.p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Breadcrumb */}
        <motion.nav initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.25 }} className="flex items-center justify-center gap-2 text-sm text-foreground/50 mb-8">
          <button onClick={() => navigate('#/')} className="hover:text-primary transition-colors">Inicio</button>
          <span>/</span>
          <span className="text-foreground font-medium">Colección</span>
          {activeCategory !== 'todos' && (
            <>
              <span>/</span>
              <span className="text-primary font-medium capitalize">{activeCategory}</span>
            </>
          )}
        </motion.nav>

        {/* Category Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-turquoise-500/25'
                  : 'bg-turquoise-50 text-turquoise-700 hover:bg-turquoise-100'
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-60">({cat.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="product-card group relative cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => navigate(`#/coleccion/${product.slug}`)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-2xl hover:shadow-turquoise-500/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-turquoise-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <AnimatePresence>
                      {hoveredProduct === product.id && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="absolute bottom-4 left-4 right-4 flex gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); window.open(generateWhatsAppLink(product), '_blank'); }}
                            className="flex-1 flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm text-turquoise-600 py-3 rounded-xl font-semibold text-sm hover:bg-white transition-colors shadow-lg"
                          >
                            <MessageCircle className="w-4 h-4" /> Pedir
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate(`#/coleccion/${product.slug}`); }}
                            className="flex items-center justify-center bg-primary text-white px-4 rounded-xl hover:bg-turquoise-600 transition-colors shadow-lg text-sm font-semibold"
                          >
                            Ver
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-turquoise-700 capitalize">{product.categoryLabel}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-turquoise-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-foreground/50 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                      <span className="text-sm font-semibold text-turquoise-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4" /> Ver Detalle
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/40 text-lg">No hay productos en esta categoría por el momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
