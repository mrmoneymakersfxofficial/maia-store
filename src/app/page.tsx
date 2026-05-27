'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RouterProvider, useRouter } from '@/lib/router';
import Navigation from '@/components/maia/Navigation';
import Footer from '@/components/maia/Footer';
import HomePage from '@/components/maia/pages/HomePage';
import NosotrosPage from '@/components/maia/pages/NosotrosPage';
import ColeccionPage from '@/components/maia/pages/ColeccionPage';
import ProductDetailPage from '@/components/maia/pages/ProductDetailPage';
import ComprarPage from '@/components/maia/pages/ComprarPage';
import ContactoPage from '@/components/maia/pages/ContactoPage';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

function PageRouter() {
  const { route } = useRouter();

  const getPage = () => {
    // Product detail: #/coleccion/pulsera-turquesa-elite (no /categoria/ in path)
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
