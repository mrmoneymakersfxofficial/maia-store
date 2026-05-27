'use client';

import { useState, useEffect, useRef } from 'react';
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
  Share2,
  ZoomIn,
} from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useStore } from '@/lib/store-context';
import { useToast } from '@/lib/toast-context';
import {
  getProductBySlug,
  getRelatedProducts,
  formatPrice,
  generateWhatsAppLink,
  products,
} from '@/lib/store-data';
import { shareProduct } from '@/lib/share';
import Lightbox from '@/components/maia/Lightbox';

export default function ProductDetailPage() {
  const { route, navigate, back } = useRouter();
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const { showToast } = useToast();
  const slug = route.params?.slug || '';
  const product = getProductBySlug(slug);
  const related = product ? getRelatedProducts(product.id) : [];
  const pageRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import('gsap')).default;
      if (!pageRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo('.detail-animate', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' });
      }, pageRef);
    })();

    return () => ctx?.revert();
  }, [slug]);

  const handleShare = async () => {
    if (!product) return;
    const ok = await shareProduct(product.name, product.slug, formatPrice(product.price));
    if (ok) {
      const canShare = typeof window !== 'undefined' && !!navigator.share;
      showToast(canShare ? '¡Compartido!' : 'Enlace copiado al portapapeles');
    }
  };

  // Build images array for lightbox (use main + related as gallery)
  const lightboxImages = product
    ? [
        { src: product.image, alt: product.name },
        ...related.slice(0, 3).map((r) => ({ src: r.image, alt: r.name })),
      ]
    : [];

  // Hover zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Producto no encontrado</h1>
          <p className="text-foreground/50 mb-8">La joya que buscas no existe o fue removida.</p>
          <button onClick={() => navigate('#/coleccion')} className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-turquoise-600 transition-colors">
            Ver Colección
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="relative pt-16 pb-32 sm:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-foreground/40 mb-4 pt-2 detail-animate">
          <button onClick={() => navigate('#/')} className="hover:text-primary transition-colors">Inicio</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate('#/coleccion')} className="hover:text-primary transition-colors">Colección</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate(`#/coleccion/categoria/${product.category}`)} className="hover:text-primary transition-colors capitalize">{product.categoryLabel}</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/60 font-medium truncate max-w-[140px]">{product.name}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => back()}
          className="detail-animate inline-flex items-center gap-1.5 text-xs font-medium text-foreground/40 hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Volver a la Colección
        </button>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20 lg:mb-28">
          {/* Image — Interactive Gallery */}
          <div className="detail-animate">
            <div
              ref={imageRef}
              className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={
                  isZooming
                    ? {
                        transform: 'scale(1.8)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : { transform: 'scale(1)' }
                }
              />
              {/* Zoom icon */}
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5 text-foreground/60" />
              </div>
            </div>

            {/* Thumbnails */}
            {lightboxImages.length > 1 && (
              <div className="flex items-center gap-2 mt-3">
                {lightboxImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIsLightboxOpen(true)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      i === 0 ? 'border-primary' : 'border-zinc-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div className="detail-animate">
              {/* Top actions row */}
              <div className="flex items-center gap-2 mb-3">
                <motion.button
                  onClick={() => toggleFavorite(product.id)}
                  className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center"
                  whileTap={{ scale: 0.85 }}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-foreground/30'}`}
                    fill={isFavorite(product.id) ? 'currentColor' : 'none'}
                  />
                </motion.button>
                <motion.button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-turquoise-50 flex items-center justify-center"
                  whileTap={{ scale: 0.85 }}
                >
                  <Share2 className="w-5 h-5 text-primary" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-200 fill-zinc-200'}`} />
                  ))}
                </div>
                <span className="text-xs text-foreground/40">{product.rating} ({product.reviews} reseñas)</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-4">{formatPrice(product.price)}</p>
              <p className="text-sm text-foreground/60 leading-relaxed">{product.longDescription}</p>
            </div>

            {/* Features */}
            <div className="detail-animate">
              <h3 className="text-sm font-bold text-foreground mb-2.5">Características</h3>
              <ul className="space-y-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-foreground/60">
                    <Check className="w-4 h-4 text-turquoise-500 flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="detail-animate flex flex-col sm:flex-row gap-2.5 pt-3">
              <motion.a
                href={generateWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-green-500/15"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" />
                Pedir por WhatsApp
              </motion.a>
              <motion.button
                onClick={() => {
                  addToCart(product);
                  showToast('Agregado al carrito');
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-turquoise-600 text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-turquoise-500/15"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag className="w-4 h-4" />
                Agregar al Carrito
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="detail-animate grid grid-cols-3 gap-2 pt-3">
              {[
                { icon: ShieldCheck, label: 'Pago Seguro' },
                { icon: Truck, label: 'Envío a Todo Perú' },
                { icon: Heart, label: 'Hecho con Amor' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center p-2.5 rounded-xl bg-turquoise-50/60">
                  <Icon className="w-5 h-5 text-turquoise-600 mb-1" />
                  <span className="text-[10px] font-medium text-foreground/50">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products — Editorial */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                También te puede interesar
              </h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {related.map((rp) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`#/coleccion/${rp.slug}`)}
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 bg-zinc-100">
                    <img src={rp.image} alt={rp.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105" loading="lazy" />
                    {rp.imageSecondary && (
                      <img src={rp.imageSecondary} alt={`${rp.name} - vista alternativa`} className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100" loading="lazy" />
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">{rp.name}</h4>
                  <p className="text-sm font-bold text-primary">{formatPrice(rp.price)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        productName={product.name}
        slug={product.slug}
        price={formatPrice(product.price)}
        onShare={handleShare}
      />
    </div>
  );
}
