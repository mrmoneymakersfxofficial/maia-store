'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MessageCircle,
  ShoppingBag,
  Star,
  Check,
  Heart,
  Truck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useRouter, RouterLink } from '@/lib/router';
import {
  getProductBySlug,
  getRelatedProducts,
  formatPrice,
  generateWhatsAppLink,
  products,
} from '@/lib/store-data';

export default function ProductDetailPage() {
  const { route, navigate, back } = useRouter();
  const slug = route.params?.slug || '';
  const product = getProductBySlug(slug);
  const related = product ? getRelatedProducts(product.id) : [];
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import('gsap')).default;

      if (!pageRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo('.detail-animate', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' });
      }, pageRef);
    })();

    return () => ctx?.revert();
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Producto no encontrado</h1>
          <p className="text-foreground/60 mb-8">La joya que buscas no existe o fue removida.</p>
          <button onClick={() => navigate('#/coleccion')} className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-turquoise-600 transition-colors">
            Ver Colección
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="relative pt-28 pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-turquoise-50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-foreground/50 mb-8 detail-animate">
          <button onClick={() => navigate('#/')} className="hover:text-primary transition-colors">Inicio</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate('#/coleccion')} className="hover:text-primary transition-colors">Colección</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate(`#/coleccion/categoria/${product.category}`)} className="hover:text-primary transition-colors capitalize">{product.categoryLabel}</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Back button */}
        <button onClick={() => back()} className="detail-animate inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver a la Colección
        </button>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {/* Image */}
          <div className="detail-animate relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-turquoise-500/10 bg-white">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-turquoise-900/10 to-transparent" />
            </div>
            {/* Stock Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-sm font-semibold text-green-600 shadow-lg inline-flex items-center gap-1.5">
                <Check className="w-4 h-4" /> En Stock
              </span>
            </div>
            {/* Category Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-lg capitalize">
                {product.categoryLabel}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="detail-animate">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm text-foreground/50">{product.rating} ({product.reviews} reseñas)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-4">{formatPrice(product.price)}</p>
              <p className="text-foreground/70 leading-relaxed text-base">{product.longDescription}</p>
            </div>

            {/* Features */}
            <div className="detail-animate">
              <h3 className="text-lg font-bold text-foreground mb-3">Características</h3>
              <ul className="space-y-2.5">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-foreground/70">
                    <Check className="w-5 h-5 text-turquoise-500 flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="detail-animate flex flex-col sm:flex-row gap-3 pt-4">
              <motion.a
                href={generateWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Pedir por WhatsApp
              </motion.a>
              <motion.button
                onClick={() => navigate('#/comprar')}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-turquoise-600 text-white px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag className="w-5 h-5" />
                Ver Métodos de Pago
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="detail-animate grid grid-cols-3 gap-3 pt-4">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-turquoise-50">
                <ShieldCheck className="w-6 h-6 text-turquoise-600 mb-1" />
                <span className="text-xs font-medium text-foreground/60">Pago Seguro</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-turquoise-50">
                <Truck className="w-6 h-6 text-turquoise-600 mb-1" />
                <span className="text-xs font-medium text-foreground/60">Envío a Todo Perú</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-turquoise-50">
                <Heart className="w-6 h-6 text-turquoise-600 mb-1" />
                <span className="text-xs font-medium text-foreground/60">Hecho con Amor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                También te puede interesar
              </h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rp) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`#/coleccion/${rp.slug}`)}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-lg">
                    <div className="relative aspect-square overflow-hidden">
                      <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-turquoise-600 transition-colors truncate">{rp.name}</h4>
                      <p className="text-base font-bold text-primary">{formatPrice(rp.price)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
