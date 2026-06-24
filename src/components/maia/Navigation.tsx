'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

// ─── WhatsApp Icon (official SVG) ────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const navLinks = [
  { page: 'home', href: '/', label: 'Inicio' },
  { page: 'nosotros', href: '/nosotros', label: 'Nosotros' },
  { page: 'coleccion', href: '/coleccion', label: 'Colección' },
  { page: 'comprar', href: '/comprar', label: 'Comprar' },
  { page: 'contacto', href: '/contacto', label: 'Contacto' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When route changes, reset scroll state
  useEffect(() => {
    setIsScrolled(false);
    setIsMobileOpen(false);
  }, [pathname]);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    router.push(href);
  }, [router]);

  const handleWhatsApp = useCallback(() => {
    const encoded = encodeURIComponent('Hola Maia Store! Me interesa ver la colección.');
    window.open(`https://wa.me/51977333858?text=${encoded}`, '_blank');
  }, []);

  const isActive = (path: string) => pathname === path;

  // On home page: transparent when top, blur when scrolled
  // On sub-pages: always show background for contrast
  const showBg = !isHomePage || isScrolled;
  const headerClass = showBg
    ? 'bg-white/85 backdrop-blur-xl border-b border-zinc-200/20 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
    : 'bg-transparent';

  const whatsappColor = showBg
    ? 'text-[#25D366] hover:text-[#20BD5A]'
    : 'text-white/70 hover:text-white';

  return (
    <>
      <motion.header
        id="navigation"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center gap-1.5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`text-xl sm:text-2xl font-extrabold tracking-tight ${showBg ? 'text-primary' : 'text-white'}`}>
                MAIA
              </span>
              <span className={`text-xl sm:text-2xl font-extralight tracking-widest ml-0.5 ${showBg ? 'text-foreground' : 'text-white/80'}`}>
                STORE
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {/* Search Icon */}
              <motion.button
                onClick={() => router.push('/buscar')}
                className={`mr-1 p-1.5 rounded-lg transition-colors duration-300 ${
                  isActive('/buscar')
                    ? 'text-primary'
                    : showBg
                      ? 'text-foreground/40 hover:text-foreground'
                      : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Buscar"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={isActive('/buscar') ? 2.5 : 2} />
              </motion.button>
              {navLinks.map((link) => (
                <motion.button
                  key={link.page}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 tracking-wide ${
                    isActive(link.href)
                      ? 'text-primary'
                      : showBg
                        ? 'text-foreground/60 hover:text-foreground'
                        : 'text-white/70 hover:text-white'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}

              {/* WhatsApp — Desktop */}
              <motion.button
                onClick={handleWhatsApp}
                className={`ml-2 p-1.5 rounded-lg transition-colors duration-300 ${whatsappColor}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
              </motion.button>
            </div>

            {/* Mobile: WhatsApp + Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              {/* WhatsApp button */}
              <motion.button
                onClick={handleWhatsApp}
                className={`p-2 rounded-xl transition-colors duration-300 ${whatsappColor}`}
                whileTap={{ scale: 0.9 }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </motion.button>

              {/* Hamburger toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-turquoise-50/80 transition-colors"
                aria-label="Menú de navegación"
              >
                <AnimatePresence mode="wait">
                  {isMobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className={`w-5 h-5 ${showBg ? 'text-primary' : 'text-white'}`} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className={`w-5 h-5 ${showBg ? 'text-primary' : 'text-white'}`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 pt-14 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-5 py-16">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.page}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className={`text-xl font-semibold transition-colors tracking-wide ${
                    isActive(link.href) ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}