'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useStore } from '@/lib/store-context';
import {
  products,
  categories,
  formatPrice,
  getProductsByCategory,
} from '@/lib/store-data';

type SortOption = 'relevance' | 'price-asc' | 'price-desc';

export default function SearchClient() {
  const router = useRouter();
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input on mount
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, []);

  // Real-time search with full-text indexing
  const results = useMemo(() => {
    let filtered =
      selectedCategory === 'todos'
        ? [...products]
        : getProductsByCategory(selectedCategory);

    // Text search — indexes name, description, longDescription, category
    if (query.trim()) {
      const terms = query
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      filtered = filtered.filter((p) => {
        const corpus = [
          p.name,
          p.description,
          p.longDescription,
          p.categoryLabel,
          p.category,
        ]
          .join(' ')
          .toLowerCase();
        return terms.every((t) => corpus.includes(t));
      });

      // Relevance sort: exact name match > name starts with > any match
      const q = query.toLowerCase().trim();
      filtered.sort((a, b) => {
        const aExact = a.name.toLowerCase() === q ? 0 : 1;
        const bExact = b.name.toLowerCase() === q ? 0 : 1;
        if (aExact !== bExact) return aExact - bExact;
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        const aCat = a.categoryLabel.toLowerCase() === q ? 0 : 1;
        const bCat = b.categoryLabel.toLowerCase() === q ? 0 : 1;
        return aCat - bCat;
      });
    }

    // Price sort
    if (sortBy === 'price-asc')
      filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc')
      filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [query, selectedCategory, sortBy]);

  const clearAll = () => {
    setQuery('');
    setSelectedCategory('todos');
    setSortBy('relevance');
    inputRef.current?.focus();
  };

  const hasActiveFilters =
    query.trim() !== '' || selectedCategory !== 'todos' || sortBy !== 'relevance';

  return (
    <div className="relative pt-16 pb-32 sm:pb-24 min-h-screen bg-background">
      {/* ═══ STICKY SEARCH HEADER ═══ */}
      <div className="sticky top-14 sm:top-16 z-30 bg-background/90 backdrop-blur-xl border-b border-zinc-100/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-3">
          {/* Search Bar */}
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-foreground/30 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar joyas... aretes, collares, pulseras"
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-zinc-100/80 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-200/80 flex items-center justify-center hover:bg-zinc-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-foreground/50" />
                </button>
              )}
            </div>

            {/* Filter toggle button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-primary/10 text-primary'
                  : 'bg-zinc-100/80 text-foreground/40 hover:bg-zinc-200'
              }`}
            >
              <SlidersHorizontal className="w-4.5 h-4.5" />
              {hasActiveFilters && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary" />
              )}
            </button>
          </div>

          {/* ═══ FILTER PANEL ═══ */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-1 space-y-3.5">
                  {/* Category Chips */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30 mb-2">
                      Categorías
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                            selectedCategory === cat.id
                              ? 'bg-primary text-white shadow-md shadow-turquoise-500/15'
                              : 'bg-zinc-100 text-foreground/50 hover:bg-zinc-200 hover:text-foreground/70'
                          }`}
                        >
                          {cat.label}
                          <span className="ml-1 text-[10px] opacity-50">
                            ({cat.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Sort */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30 mb-2 flex items-center gap-1.5">
                      <ArrowUpDown className="w-3 h-3" />
                      Clasificación por precio
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(
                        [
                          { id: 'relevance' as SortOption, label: 'Relevancia' },
                          { id: 'price-asc' as SortOption, label: 'Menor a mayor' },
                          { id: 'price-desc' as SortOption, label: 'Mayor a menor' },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSortBy(opt.id)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${
                            sortBy === opt.id
                              ? 'bg-turquoise-100 text-primary font-semibold'
                              : 'bg-zinc-100 text-foreground/40 hover:bg-zinc-200 hover:text-foreground/60'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear all */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ RESULTS ═══ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-5">
        {/* Results count + active filter summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-foreground/40">
            {query.trim() ? (
              <>
                <span className="font-semibold text-foreground/60">
                  {results.length}
                </span>{' '}
                resultado{results.length !== 1 ? 's' : ''} para &ldquo;
                <span className="text-primary">{query}</span>&rdquo;
              </>
            ) : (
              <>
                Mostrando{' '}
                <span className="font-semibold text-foreground/60">
                  {results.length}
                </span>{' '}
                productos
              </>
            )}
          </p>
          {(selectedCategory !== 'todos' || sortBy !== 'relevance') && (
            <div className="flex items-center gap-1.5">
              {selectedCategory !== 'todos' && (
                <span className="px-2 py-0.5 rounded-full bg-turquoise-50 text-[10px] font-medium text-primary capitalize">
                  {categories.find((c) => c.id === selectedCategory)?.label}
                </span>
              )}
              {sortBy !== 'relevance' && (
                <span className="px-2 py-0.5 rounded-full bg-turquoise-50 text-[10px] font-medium text-primary">
                  {sortBy === 'price-asc'
                    ? 'Precio ↑'
                    : sortBy === 'price-desc'
                      ? 'Precio ↓'
                      : ''}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ═══ PRODUCT GRID ═══ */}
        {results.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            <AnimatePresence mode="popLayout">
              {results.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/coleccion/${product.slug}`)}
                >
                  <div className="flex gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/50 border border-zinc-100/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40 transition-all duration-400">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Category badge */}
                      <div className="absolute top-1.5 left-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-white/85 backdrop-blur-sm text-[9px] sm:text-[10px] font-semibold text-turquoise-700 shadow-sm">
                          {product.categoryLabel}
                        </span>
                      </div>
                      {/* Favorite button */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="absolute bottom-1.5 right-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        whileTap={{ scale: 0.85 }}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            isFavorite(product.id)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-foreground/40'
                          }`}
                          fill={isFavorite(product.id) ? 'currentColor' : 'none'}
                        />
                      </motion.button>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5 truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-foreground/40 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base sm:text-lg font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[11px] sm:text-xs font-medium text-turquoise-600 inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                          Ver más{' '}
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-foreground/15" />
            </div>
            <p className="text-foreground/40 text-base font-medium mb-1">
              No se encontraron resultados
            </p>
            <p className="text-foreground/25 text-xs mb-5">
              Intenta con otra búsqueda o revisa las categorías
            </p>
            <button
              onClick={clearAll}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-turquoise-600 transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}