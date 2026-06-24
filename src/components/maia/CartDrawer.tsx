'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/store-data';
import { useRouter } from 'next/navigation';

// ─── Listen for custom "open-cart-drawer" DOM event ──────────
function useCartDrawerOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-cart-drawer', handler);
    return () => window.removeEventListener('open-cart-drawer', handler);
  }, []);

  return [open, setOpen] as const;
}

export default function CartDrawer() {
  const [open, setOpen] = useCartDrawerOpen();
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useStore();
  const router = useRouter();

  const handleCheckout = () => {
    setOpen(false);
    router.push('/checkout');
  };

  const handleWhatsApp = () => {
    if (cart.length === 0) return;
    const items = cart
      .map((item) =>
        `• ${item.product.name} (x${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`
      )
      .join('\n');
    const message = `Hola Maia Store! Quisiera hacer un pedido:\n\n${items}\n\nTotal: ${formatPrice(cartTotal)}`;
    window.open(
      `https://wa.me/51977333858?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const navigateTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[400px] p-0 flex flex-col bg-white"
      >
        {/* ─── Header ─────────────────────────────────────── */}
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-zinc-100/80 flex-shrink-0">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-[18px] h-[18px] text-primary" />
              </div>
              <div>
                <SheetTitle className="text-[15px] font-bold text-foreground leading-tight">
                  Mi Carrito
                </SheetTitle>
                <SheetDescription className="text-[11px] text-foreground/40 mt-0.5">
                  {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}
                </SheetDescription>
              </div>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-foreground/30 hover:text-red-500 transition-colors font-medium"
              >
                Vaciar
              </button>
            )}
          </div>
        </SheetHeader>

        {/* ─── Items List ─────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {cart.length > 0 ? (
            <div className="p-4 space-y-2.5">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-3 p-2.5 rounded-xl bg-zinc-50/60 border border-zinc-100/60 group"
                  >
                    {/* Product Image — clickable */}
                    <div
                      className="relative w-[60px] h-[60px] rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 cursor-pointer"
                      onClick={() => navigateTo(`/coleccion/${item.product.slug}`)}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h4
                          className="text-[12px] font-semibold text-foreground truncate cursor-pointer hover:text-primary transition-colors leading-tight"
                          onClick={() => navigateTo(`/coleccion/${item.product.slug}`)}
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] text-foreground/35 mt-0.5">
                          {item.product.color?.name && (
                            <span className="capitalize">{item.product.color.name}</span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-md bg-white border border-zinc-200/80 flex items-center justify-center hover:bg-zinc-50 active:scale-90 transition-all"
                          >
                            <Minus className="w-3 h-3 text-foreground/40" />
                          </button>
                          <span className="text-[11px] font-bold text-foreground w-5 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-md bg-white border border-zinc-200/80 flex items-center justify-center hover:bg-zinc-50 active:scale-90 transition-all"
                          >
                            <Plus className="w-3 h-3 text-foreground/40" />
                          </button>
                        </div>

                        {/* Price + Delete */}
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-primary tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-red-50 active:scale-90 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-foreground/20 hover:text-red-400 transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* ─── Empty State ─────────────────────────────── */
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-foreground/12" />
              </div>
              <p className="text-sm font-semibold text-foreground/35 mb-1">
                Tu carrito está vacío
              </p>
              <p className="text-xs text-foreground/25 mb-6 leading-relaxed">
                Explora nuestra colección y encuentra la joya perfecta para ti
              </p>
              <button
                onClick={() => navigateTo('/coleccion')}
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-turquoise-600 transition-colors active:scale-95"
              >
                Ver Colección
              </button>
            </div>
          )}
        </div>

        {/* ─── Footer with Total + CTAs ────────────────────── */}
        {cart.length > 0 && (
          <SheetFooter className="border-t border-zinc-100/80 px-5 py-4 gap-2.5 flex-shrink-0 bg-white">
            {/* Total */}
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-sm text-foreground/50 font-medium">Total</span>
              <span className="text-lg font-bold text-foreground tabular-nums">
                {formatPrice(cartTotal)}
              </span>
            </div>

            {/* Primary CTA — Checkout */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-turquoise-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-turquoise-500/15 active:scale-[0.98]"
            >
              Proceder al Pago
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA — WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366]/8 hover:bg-[#25D366]/15 text-[#25D366] py-3 rounded-xl font-semibold text-[13px] transition-colors active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir por WhatsApp
            </button>

            {/* Link to full cart page */}
            <button
              onClick={() => navigateTo('/carrito')}
              className="w-full text-[11px] text-foreground/30 hover:text-primary transition-colors font-medium py-1"
            >
              Ver carrito completo
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}