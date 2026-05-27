'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/store-data';

export default function BottomAppBar() {
  const { navigate, route } = useRouter();
  const { cartCount, cartTotal, favorites, toggleFavorite, cart } = useStore();
  const [showWhatsAppPulse, setShowWhatsAppPulse] = useState(false);

  // Pulse WhatsApp badge periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowWhatsAppPulse(true);
      setTimeout(() => setShowWhatsAppPulse(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (page: string) => route.page === page;

  const handleWhatsApp = useCallback(() => {
    let message = 'Hola Maia Store! Me interesa ver la colección.';
    if (cart.length > 0) {
      const items = cart
        .map((item) => `• ${item.product.name} (x${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`)
        .join('\n');
      const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
      message = `Hola Maia Store! Quisiera hacer un pedido:\n\n${items}\n\nTotal: ${formatPrice(total)}`;
    }
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/51977333858?text=${encoded}`, '_blank');
  }, [cart]);

  return (
    <>
      {/* Spacer so bottom bar doesn't cover content */}
      <div className="h-20 sm:h-4" />

      {/* Bottom Bar Container */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        {/* Subtle top border glow */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-turquoise-300/30 to-transparent" />

        <div className="bg-white/80 backdrop-blur-2xl border-t border-zinc-100/50">
          <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
            {/* Home */}
            <BottomTab
              icon={Home}
              label="Inicio"
              active={isActive('home')}
              onClick={() => navigate('#/')}
            />

            {/* Favorites */}
            <BottomTab
              icon={Heart}
              label="Favoritos"
              active={isActive('favorites')}
              badge={favorites.length > 0 ? favorites.length : undefined}
              onClick={() => navigate('#/favoritos')}
            />

            {/* WhatsApp CTA — Center elevated button */}
            <motion.button
              onClick={handleWhatsApp}
              className="relative -mt-6 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
            >
              {/* Ping animation */}
              <AnimatePresence>
                {showWhatsAppPulse && (
                  <motion.span
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 rounded-full bg-[#25D366]"
                  />
                )}
              </AnimatePresence>
              <MessageCircle className="w-6 h-6 text-white relative z-10" strokeWidth={2} />
            </motion.button>

            {/* Cart */}
            <BottomTab
              icon={ShoppingBag}
              label="Carrito"
              active={isActive('carrito')}
              badge={cartCount > 0 ? cartCount : undefined}
              onClick={() => navigate('#/carrito')}
            />

            {/* Contact */}
            <BottomTab
              icon={MessageCircle}
              label="Contacto"
              active={isActive('contacto')}
              onClick={() => navigate('#/contacto')}
              variant="outline"
            />
          </div>

          {/* Safe area bottom for iOS */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </>
  );
}

// ─── Tab Button Component ────────────────────────────────────

function BottomTab({
  icon: Icon,
  label,
  active,
  badge,
  onClick,
  variant = 'default',
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
  variant?: 'default' | 'outline';
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-0.5 w-14 py-1.5 rounded-xl transition-colors"
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        <Icon
          className={`w-5 h-5 transition-colors duration-200 ${
            active
              ? variant === 'outline'
                ? 'text-primary'
                : 'text-primary'
              : 'text-foreground/40'
          }`}
          strokeWidth={active ? 2.5 : 2}
          fill={active && variant !== 'outline' ? 'currentColor' : 'none'}
        />
        {badge !== undefined && badge > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-2 min-w-[16px] h-4 flex items-center justify-center px-1 rounded-full bg-primary text-white text-[10px] font-bold"
          >
            {badge > 99 ? '99+' : badge}
          </motion.span>
        )}
      </div>
      <span
        className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
          active ? 'text-primary' : 'text-foreground/40'
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}
