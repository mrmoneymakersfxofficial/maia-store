'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowLeft, MessageCircle, CreditCard, Plus, Minus } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useStore } from '@/lib/store-context';
import { useToast } from '@/lib/toast-context';
import { formatPrice } from '@/lib/store-data';

export default function CarritoPage() {
  const { navigate } = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useStore();
  const { showToast } = useToast();

  const handleCheckout = useCallback(() => {
    navigate('#/checkout');
  }, [navigate]);

  const handleWhatsApp = useCallback(() => {
    const items = cart
      .map(
        (item) =>
          `• ${item.product.name} (x${item.quantity}) — ${formatPrice(item.product.price * item.quantity)}`
      )
      .join('\n');
    const message = encodeURIComponent(
      `Hola Maia Store! Quisiera hacer el siguiente pedido:\n\n${items}\n\nTotal: ${formatPrice(cartTotal)}`
    );
    window.open(`https://wa.me/51977333858?text=${message}`, '_blank');
  }, [cart, cartTotal]);

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mi Carrito</h1>
              <p className="text-sm text-foreground/50 mt-1">
                {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
              </p>
            </div>
            {cart.length > 0 && (
              <motion.button
                onClick={() => {
                  clearCart();
                  showToast('Carrito vaciado');
                }}
                className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
                whileTap={{ scale: 0.95 }}
              >
                Vaciar carrito
              </motion.button>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-turquoise-50 flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-turquoise-300" />
            </div>
            <p className="text-foreground/40 text-lg mb-2">Tu carrito esta vacio</p>
            <p className="text-foreground/30 text-sm mb-6">
              Agrega las joyas que te gusten y realiza tu pedido
            </p>
            <motion.button
              onClick={() => navigate('#/coleccion')}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-turquoise-500/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingBag className="w-4 h-4" /> Ver Coleccion
            </motion.button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {cart.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex gap-4 p-3 rounded-2xl bg-white/60 border border-zinc-100/60"
                >
                  <div
                    className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => navigate(`#/coleccion/${item.product.slug}`)}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-sm text-foreground truncate cursor-pointer hover:text-primary transition-colors"
                      onClick={() => navigate(`#/coleccion/${item.product.slug}`)}
                    >
                      {item.product.name}
                    </h3>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 bg-zinc-100 rounded-lg">
                        <motion.button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-foreground/50 hover:text-foreground"
                          whileTap={{ scale: 0.85 }}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </motion.button>
                        <span className="text-xs font-bold text-foreground w-6 text-center">{item.quantity}</span>
                        <motion.button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-foreground/50 hover:text-foreground"
                          whileTap={{ scale: 0.85 }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-bold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <motion.button
                        onClick={() => {
                          removeFromCart(item.product.id);
                          showToast('Producto eliminado');
                        }}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total & CTAs */}
            <div className="sticky bottom-24 sm:bottom-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-100/60 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground/60">Subtotal</span>
                <span className="text-sm text-foreground/70">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground/60">Envio</span>
                <span className="text-sm text-green-600 font-semibold">Gratis</span>
              </div>
              <div className="flex items-center justify-between pt-2 mb-4 border-t border-zinc-100">
                <span className="text-sm font-bold text-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={handleCheckout}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-turquoise-500/20 hover:bg-turquoise-600 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CreditCard className="w-4 h-4" />
                  Proceder al Pago
                </motion.button>
                <motion.button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-4 rounded-xl font-semibold text-sm shadow-lg shadow-green-500/20 hover:bg-[#20BD5A] transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
