'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageCircle, ShoppingBag, Heart, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store-context';
import { formatPrice, generateWhatsAppLink } from '@/lib/store-data';
import { getImageUrl } from '@/lib/sanity.client';
import GridToggle, { useGridView } from '@/components/maia/GridToggle';
import type { SanityProduct, SanityCategory } from '@/lib/data';

interface ColeccionClientProps {
  allProducts: SanityProduct[];
  categories: SanityCategory[];
}

export default function ColeccionClient({ allProducts, categories: sanityCategories }: ColeccionClientProps) {
  const searchParams = useSearchParams();
  const activeCategorySlug = searchParams.get('categoria') || 'todos';
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const { viewMode, setViewMode, isReady } = useGridView('single');

  // Build category list: "todos" + Sanity categories
  const categoryList = useMemo(() => {
    const cats = [{ id: 'todos', label: 'Todos', slug: 'todos', count: allProducts.length }];
    for (const c of sanityCategories) {
      cats.push({
        id: c.slug,
        label: c.name,
        slug: c.slug,
        count: c.productCount || 0,
      });
    }
    return cats;
  }, [sanityCategories, allProducts.length]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (activeCategorySlug === 'todos') return allProducts;
    return allProducts.filter((p) => p.categorySlug === activeCategorySlug);
  }, [allProducts, activeCategorySlug]);

  // Grid classes based on view mode
  const gridClass = viewMode === 'single'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
    : 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-6';

  const aspectClass = viewMode === 'single' ? 'aspect-[3/4]' : 'aspect-[3/4] sm:aspect-square';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeCategorySlug]);

  return (
    <div className="relative pt-20 pb-20 sm:pb-24">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-12 xl:px-16">
        {/* Page Header */}
        <div id="coleccion-header" className="text-center mb-8 pt-4 scroll-mt-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-600 mb-3 block"
          >
            Catalogo Completo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3"
          >
            Nuestra <span className="text-gradient-turquoise">Coleccion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-foreground/40 max-w-md mx-auto"
          >
            Explora nuestras piezas artesanales. Cada joya es unica, hecha a mano y lista para ser tuya.
          </motion.p>
        </div>

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex items-center justify-center gap-1.5 text-xs text-foreground/40 mb-6"
        >
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-foreground/60 font-medium">Coleccion</span>
          {activeCategorySlug !== 'todos' && (
            <>
              <span>/</span>
              <span className="text-primary font-medium capitalize">{activeCategorySlug}</span>
            </>
          )}
        </motion.nav>

        {/* Category Filters + Grid Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 flex-1">
            {categoryList.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'todos' ? '/coleccion' : `/coleccion?categoria=${cat.id}`}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 tracking-wide ${
                  activeCategorySlug === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-turquoise-500/20'
                    : 'bg-zinc-100 text-foreground/50 hover:bg-zinc-200'
                }`}
              >
                {cat.label}
                <span className="ml-1 text-[10px] opacity-50">({cat.count})</span>
              </Link>
            ))}
          </div>
          <GridToggle value={viewMode} onChange={setViewMode} />
        </motion.div>

        {/* Product Grid */}
        <div id="coleccion-productos" className={gridClass}>
          {filteredProducts.map((product, i) => {
            const mainImage = getImageUrl(product.mainImage, 600, 800) || '';
            const secondaryImage = getImageUrl(product.secondaryImage, 600, 800) || '';
            const categoryLabel = product.categoryName || 'Joyas';
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="product-card group cursor-pointer overflow-hidden"
              >
                <Link href={`/coleccion/${product.slug}`}>
                  <div className={`relative ${aspectClass} rounded-sm sm:rounded-2xl overflow-hidden mb-2 sm:mb-2.5 bg-zinc-100`}>
                    {mainImage && (
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    {secondaryImage && (
                      <img
                        src={secondaryImage}
                        alt={`${product.name} - vista alternativa`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-2 left-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-semibold text-turquoise-700">
                        {categoryLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(generateWhatsAppLink({ name: product.name, slug: product.slug, price: product.price, description: product.description || '' }), '_blank'); }}
                        className="flex-1 flex items-center justify-center gap-1 bg-white/90 backdrop-blur-sm text-turquoise-600 py-2.5 rounded-xl text-xs font-semibold shadow-lg"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Pedir
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product._id); }}
                        className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
                      >
                        <Heart
                          className={`w-4 h-4 ${isFavorite(product._id) ? 'text-red-500 fill-red-500' : 'text-foreground/50'}`}
                          fill={isFavorite(product._id) ? 'currentColor' : 'none'}
                        />
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart({ id: product._id, slug: product.slug, name: product.name, price: product.price, image: mainImage, categoryLabel, description: product.description || '' }); }}
                        className="w-10 h-10 flex items-center justify-center bg-primary rounded-xl shadow-lg"
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
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
                </Link>
              </motion.div>
            );
          })}
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
