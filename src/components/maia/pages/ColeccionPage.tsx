'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MessageCircle, ShoppingBag, Heart, ArrowDown } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useStore } from '@/lib/store-context';
import { products, categories, getProductsByCategory, formatPrice, generateWhatsAppLink } from '@/lib/store-data';
import GridToggle, { useGridView } from '@/components/maia/GridToggle';

export default function ColeccionPage() {
  const { route, navigate } = useRouter();
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const activeCategory = route.params?.category || 'todos';
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const { viewMode, setViewMode, isReady } = useGridView('single');

  const filteredProducts = getProductsByCategory(activeCategory);

  // Grid classes based on view mode
  const gridClass = viewMode === 'single'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-0'
    : 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 px-2 sm:px-0';

  const aspectClass = viewMode === 'single' ? 'aspect-[3/4]' : 'aspect-[3/4] sm:aspect-square';

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!sectionRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo('.product-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, [activeCategory]);

  const handleCategoryClick = (catId: string) => {
    if (catId === 'todos') {
      navigate('#/coleccion');
    } else {
      navigate(`#/coleccion/categoria/${catId}`);
    }
  };

  return (
    <div ref={sectionRef} className="relative pt-20 pb-32 sm:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Page Header */}
        <div className="text-center mb-8 pt-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-600 mb-3 block"
          >
            Catalogo Completo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3"
          >
            Nuestra <span className="text-gradient-turquoise">Coleccion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-foreground/40 max-w-md mx-auto"
          >
            Explora nuestras piezas artesanales. Cada joya es unica, hecha a mano y lista para ser tuya.
          </motion.p>
        </div>

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex items-center justify-center gap-1.5 text-xs text-foreground/40 mb-6"
        >
          <button onClick={() => navigate('#/')} className="hover:text-primary transition-colors">Inicio</button>
          <span>/</span>
          <span className="text-foreground/60 font-medium">Coleccion</span>
          {activeCategory !== 'todos' && (
            <>
              <span>/</span>
              <span className="text-primary font-medium capitalize">{activeCategory}</span>
            </>
          )}
        </motion.nav>

        {/* Category Filters + Grid Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 flex-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 tracking-wide ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-turquoise-500/20'
                    : 'bg-zinc-100 text-foreground/50 hover:bg-zinc-200'
                }`}
              >
                {cat.label}
                <span className="ml-1 text-[10px] opacity-50">({cat.count})</span>
              </button>
            ))}
          </div>
          <GridToggle value={viewMode} onChange={setViewMode} />
        </motion.div>

        {/* Product Grid */}
        <div className={gridClass}>
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="product-card group cursor-pointer"
                onClick={() => navigate(`#/coleccion/${product.slug}`)}
              >
                {/* Image with dual hover effect */}
                <div className={`relative ${aspectClass} rounded-2xl overflow-hidden mb-2.5 bg-zinc-100`}>
                  {/* Main image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Secondary image (revealed on hover) */}
                  {product.imageSecondary && (
                    <img
                      src={product.imageSecondary}
                      alt={`${product.name} - vista alternativa`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                      loading="lazy"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-semibold text-turquoise-700">
                      {product.categoryLabel}
                    </span>
                  </div>

                  {/* Quick actions */}
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-2 left-2 right-2 flex gap-1.5 group-hover:!opacity-100"
                      style={{ opacity: 0 }}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(generateWhatsAppLink(product), '_blank'); }}
                        className="flex-1 flex items-center justify-center gap-1 bg-white/90 backdrop-blur-sm text-turquoise-600 py-2.5 rounded-xl text-xs font-semibold shadow-lg"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Pedir
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                        className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
                      >
                        <Heart
                          className={`w-4 h-4 ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-foreground/50'}`}
                          fill={isFavorite(product.id) ? 'currentColor' : 'none'}
                        />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="w-10 h-10 flex items-center justify-center bg-primary rounded-xl shadow-lg"
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Info */}
                <div className="px-0.5">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
                    <span className="text-[11px] font-medium text-turquoise-600 inline-flex items-center gap-0.5">
                      Ver <ArrowDown className="w-3 h-3 rotate-[-90deg]" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/30 text-base">No hay productos en esta categoria por el momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
