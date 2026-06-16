'use client';

import { motion } from 'framer-motion';
import { Home, Heart, ShoppingBag, Gem, Search } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useStore } from '@/lib/store-context';

export default function BottomAppBar() {
  const { navigate, route } = useRouter();
  const { cartCount, favorites } = useStore();

  const isActive = (page: string) => route.page === page;

  const openCartDrawer = () => window.dispatchEvent(new Event('open-cart-drawer'));

  const tabs = [
    { icon: Home, label: 'Inicio', page: 'home', href: '#/' },
    { icon: Gem, label: 'Colección', page: 'coleccion', href: '#/coleccion' },
    { icon: Heart, label: 'Favoritos', page: 'favoritos', href: '#/favoritos', badge: favorites.length },
    { icon: ShoppingBag, label: 'Carrito', page: 'carrito', href: '#/carrito', badge: cartCount, drawer: true },
    { icon: Search, label: 'Buscar', page: 'buscar', href: '#/buscar' },
  ];

  return (
    <>
      {/* Spacer so bottom bar doesn't cover content */}
      <div className="h-16 sm:h-4" />

      {/* Bottom Bar Container */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        {/* Subtle top border glow */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-turquoise-300/30 to-transparent" />

        <div className="bg-white/90 backdrop-blur-2xl border-t border-zinc-100/50">
          <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto px-1 py-1.5">
            {tabs.map((tab) => (
              <BottomTab
                key={tab.page}
                icon={tab.icon}
                label={tab.label}
                active={isActive(tab.page)}
                badge={tab.badge}
                onClick={() => {
                  if ('drawer' in tab && tab.drawer) {
                    openCartDrawer();
                  } else {
                    navigate(tab.href);
                  }
                }}
              />
            ))}
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
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-0.5 w-full py-1.5 transition-colors"
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        <Icon
          className={`w-5 h-5 transition-colors duration-200 ${
            active ? 'text-primary' : 'text-foreground/35'
          }`}
          strokeWidth={active ? 2.5 : 1.8}
          fill={active ? 'currentColor' : 'none'}
        />
        {badge !== undefined && badge > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 flex items-center justify-center px-1 rounded-full bg-primary text-white text-[10px] font-bold"
          >
            {badge > 99 ? '99+' : badge}
          </motion.span>
        )}
      </div>
      <span
        className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
          active ? 'text-primary' : 'text-foreground/35'
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}