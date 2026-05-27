'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useStore } from '@/lib/store-context';
import { products, formatPrice } from '@/lib/store-data';

export default function FavoritosPage() {
  const { navigate } = useRouter();
  const { favorites, toggleFavorite, addToCart } = useStore();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="relative pt-20 pb-32 sm:pb-24 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('#/')}
            className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Inicio
          </button>
          <h1 className="text-3xl font-bold text-foreground">Mis Favoritos</h1>
          <p className="text-sm text-foreground/50 mt-1">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'joya guardada' : 'joyas guardadas'}
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-turquoise-50 flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-turquoise-300" />
            </div>
            <p className="text-foreground/40 text-lg mb-2">Sin favoritos aún</p>
            <p className="text-foreground/30 text-sm mb-6">
              Explora la colección y guarda las joyas que te encantan
            </p>
            <motion.button
              onClick={() => navigate('#/coleccion')}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-turquoise-500/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingBag className="w-4 h-4" /> Ver Colección
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex gap-4 p-3 rounded-2xl bg-white/60 border border-zinc-100/60"
              >
                <div
                  className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`#/coleccion/${product.slug}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-sm text-foreground truncate cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigate(`#/coleccion/${product.slug}`)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-foreground/40 mt-0.5 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-base font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 rounded-full bg-turquoise-50 flex items-center justify-center text-primary hover:bg-turquoise-100 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => toggleFavorite(product.id)}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-4 h-4" fill="currentColor" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
