'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useRouter } from '@/lib/router';

const navLinks = [
  { page: 'home', href: '#/', label: 'Inicio' },
  { page: 'nosotros', href: '#/nosotros', label: 'Nosotros' },
  { page: 'coleccion', href: '#/coleccion', label: 'Colección' },
  { page: 'comprar', href: '#/comprar', label: 'Comprar' },
  { page: 'contacto', href: '#/contacto', label: 'Contacto' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { navigate, route } = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    navigate(href);
  }, [navigate]);

  const isActive = (page: string) => route.page === page;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass shadow-lg shadow-turquoise-500/5' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('#/')}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">MAIA</span>
                <span className="text-2xl sm:text-3xl font-extralight tracking-widest text-foreground ml-1">STORE</span>
                <motion.div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-turquoise-500 to-turquoise-300" initial={{ width: 0 }} whileHover={{ width: '100%' }} transition={{ duration: 0.3 }} />
              </div>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.page}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive(link.page)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  {isActive(link.page) && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                  )}
                </motion.button>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <motion.a
                href="https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Me%20interesa%20ver%20la%20colección"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-primary hover:bg-turquoise-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-turquoise-500/25 hover:shadow-turquoise-500/40"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-4 h-4" />
                Pedir Ahora
              </motion.a>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-turquoise-50 hover:bg-turquoise-100 transition-colors"
                aria-label="Menú de navegación"
              >
                <AnimatePresence mode="wait">
                  {isMobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5 text-primary" />
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 pt-20 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-6 py-12">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.page}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={`text-2xl font-semibold transition-colors ${
                    isActive(link.page) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                href="https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Me%20interesa%20ver%20la%20colección"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-4 flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg shadow-turquoise-500/25"
              >
                <ShoppingBag className="w-5 h-5" />
                Pedir Ahora
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
