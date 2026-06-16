'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RouterProvider, useRouter } from '@/lib/router';
import Navigation from '@/components/maia/Navigation';
import Footer from '@/components/maia/Footer';
import BottomAppBar from '@/components/maia/BottomAppBar';
import CartDrawer from '@/components/maia/CartDrawer';
import ScrollToTop from '@/components/maia/ScrollToTop';
import ScrollProgress from '@/components/maia/ScrollProgress';
import HomePage from '@/components/maia/pages/HomePage';
import NosotrosPage from '@/components/maia/pages/NosotrosPage';
import ColeccionPage from '@/components/maia/pages/ColeccionPage';
import ProductDetailPage from '@/components/maia/pages/ProductDetailPage';
import ComprarPage from '@/components/maia/pages/ComprarPage';
import ContactoPage from '@/components/maia/pages/ContactoPage';
import FavoritosPage from '@/components/maia/pages/FavoritosPage';
import CarritoPage from '@/components/maia/pages/CarritoPage';
import CheckoutPage from '@/components/maia/pages/CheckoutPage';
import SearchPage from '@/components/maia/pages/SearchPage';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function PageRouter() {
  const { route } = useRouter();
  const prevHashRef = useRef(route.hash);

  // Scroll to top on every route change (but not on home hero section)
  useEffect(() => {
    if (route.hash !== prevHashRef.current) {
      prevHashRef.current = route.hash;
      // Skip scroll for home page to preserve hero experience
      if (route.page !== 'home') {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    }
  }, [route.hash, route.page]);

  const getPage = () => {
    if (route.page === 'coleccion' && route.params?.slug) {
      return <ProductDetailPage />;
    }
    switch (route.page) {
      case 'nosotros':
        return <NosotrosPage />;
      case 'coleccion':
        return <ColeccionPage />;
      case 'comprar':
        return <ComprarPage />;
      case 'contacto':
        return <ContactoPage />;
      case 'favoritos':
        return <FavoritosPage />;
      case 'carrito':
        return <CarritoPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'buscar':
        return <SearchPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={route.hash}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {getPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BottomAppBar />
      <CartDrawer />
      <ScrollToTop />
      <ScrollProgress />
    </div>
  );
}

export default function Home() {
  return (
    <RouterProvider>
      <PageRouter />
    </RouterProvider>
  );
}