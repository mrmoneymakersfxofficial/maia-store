'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Minus,
  Plus,
} from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { useToast } from '@/lib/toast-context';
import { formatPrice, generateWhatsAppLink } from '@/lib/store-data';
import { getImageUrl } from '@/lib/sanity.client';
import { shareProduct } from '@/lib/share';
import Lightbox from '@/components/maia/Lightbox';
import type { SanityProduct } from '@/lib/data';

const COLOR_SWATCHES: Record<string, string> = {
  'Crema': '#F5F0E1', 'Rosado': '#F4B8C1', 'Verde Botella': '#2E5E3D',
  'Fucsia': '#C2185B', 'Morado': '#7B1FA2', 'Turquesa': '#00ACC1',
  'Rosa Pastel': '#F8BBD0', 'Verde Agua': '#80CBC4', 'Jaspe Imperial': '#8D6E63',
  'Rodocrosita': '#E57373', 'Simple': '#BDBDBD',
};

interface ProductDetailClientProps {
  product: SanityProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const { showToast } = useToast();
  const pageRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productUrl, setProductUrl] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  // Build display images from Sanity gallery or mainImage
  const displayImages = useMemo(() => {
    const imgs: Array<{ src: string; alt: string; thumb: string }> = [];
    // Main image
    const mainUrl = getImageUrl(product.mainImage, 800, 800) || '';
    if (mainUrl) imgs.push({ src: mainUrl, alt: `${product.name}`, thumb: getImageUrl(product.mainImage, 200, 200) || mainUrl });
    // Gallery images
    if (product.gallery) {
      for (const g of product.gallery) {
        const url = g.image ? getImageUrl(g.image, 800, 800) : null;
        if (url && url !== mainUrl) {
          imgs.push({ src: url, alt: g.alt || `${product.name}`, thumb: g.image ? (getImageUrl(g.image, 200, 200) || url) : url });
        }
      }
    }
    // Secondary image if not already in gallery
    const secUrl = getImageUrl(product.secondaryImage, 800, 800) || '';
    if (secUrl && !imgs.some((i) => i.src === secUrl)) {
      imgs.push({ src: secUrl, alt: `${product.name} - vista 2`, thumb: secUrl });
    }
    return imgs;
  }, [product]);

  const currentMainImage = displayImages[selectedImageIndex]?.src || '';

  // Related products
  const related = useMemo(() => {
    return (product.relatedProducts || []).slice(0, 4);
  }, [product]);

  useEffect(() => {
    if (typeof window !== 'undefined') setProductUrl(window.location.href);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [product._id]);

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
  }, [product._id]);

  const handleShare = async () => {
    const ok = await shareProduct(product.name, product.slug, formatPrice(product.price));
    if (ok) {
      const canShare = typeof window !== 'undefined' && !!navigator.share;
      showToast(canShare ? '\u00a1Compartido!' : 'Enlace copiado al portapapeles');
    }
  };

  const handleMainImageClick = useCallback(() => {
    setLightboxIndex(selectedImageIndex);
    setIsLightboxOpen(true);
  }, [selectedImageIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const categoryLabel = product.categoryName || 'Joyas';
  const rating = product.rating || 5;
  const reviewCount = product.reviewCount || 0;

  return (
    <div ref={pageRef} className="relative pt-16 pb-20 sm:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-foreground/40 mb-4 pt-2 detail-animate">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/coleccion" className="hover:text-primary transition-colors">Coleccion</Link>
          <ChevronRight className="w-3 h-3" />
          {product.categorySlug && (
            <>
              <Link href={`/coleccion?categoria=${product.categorySlug}`} className="hover:text-primary transition-colors capitalize">{categoryLabel}</Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-foreground/60 font-medium truncate max-w-[140px]">{product.name}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="detail-animate inline-flex items-center gap-1.5 text-xs font-medium text-foreground/40 hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Volver a la Coleccion
        </button>

        {/* Product Detail */}
        <div id="producto-detalle" className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20 lg:mb-28 scroll-mt-16">
          {/* Image Gallery */}
          <div className="detail-animate">
            <div
              ref={imageRef}
              className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 cursor-zoom-in"
              onClick={handleMainImageClick}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentMainImage}
                  src={currentMainImage}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={isZooming ? { transform: 'scale(1.8)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : { transform: 'scale(1)' }}
                />
              </AnimatePresence>
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <ZoomIn className="w-5 h-5 text-foreground/60" />
              </div>
            </div>

            {displayImages.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {displayImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      i === selectedImageIndex ? 'border-primary ring-1 ring-primary/30' : 'border-zinc-200 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img src={img.thumb || img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div className="detail-animate">
              <div className="flex items-center gap-2 mb-3">
                <motion.button onClick={() => toggleFavorite(product._id)} className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center" whileTap={{ scale: 0.85 }}>
                  <Heart className={`w-5 h-5 transition-colors ${isFavorite(product._id) ? 'text-red-500 fill-red-500' : 'text-foreground/30'}`} fill={isFavorite(product._id) ? 'currentColor' : 'none'} />
                </motion.button>
                <motion.button onClick={handleShare} className="w-10 h-10 rounded-full bg-turquoise-50 flex items-center justify-center" whileTap={{ scale: 0.85 }}>
                  <Share2 className="w-5 h-5 text-primary" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-200 fill-zinc-200'}`} />
                  ))}
                </div>
                <span className="text-xs text-foreground/40">{rating} ({reviewCount} resenas)</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-4">{formatPrice(product.price)}</p>
              <p className="text-sm text-foreground/60 leading-relaxed">{product.description}</p>
            </div>

            {/* Color */}
            {product.color && (
              <div className="detail-animate">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  Color: <span className="font-normal text-foreground/60">{product.color}</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full border-2 border-zinc-200" style={{ backgroundColor: COLOR_SWATCHES[product.color] || '#ccc' }} />
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="detail-animate">
                <h3 className="text-sm font-bold text-foreground mb-2.5">Caracteristicas</h3>
                <ul className="space-y-2">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-foreground/60">
                      <Check className="w-4 h-4 text-turquoise-500 flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div className="detail-animate">
                <h3 className="text-sm font-bold text-foreground mb-2.5">Materiales</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((mat) => (
                    <span key={mat} className="px-3 py-1 rounded-full bg-zinc-100 text-xs text-foreground/60">{mat}</span>
                  ))}
                </div>
              </div>
            )}

            {/* SKU */}
            {product.sku && (
              <div className="detail-animate">
                <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-[10px] font-mono font-medium text-foreground/40">
                  SKU: {product.sku}
                </span>
              </div>
            )}

            {/* Quantity */}
            <div className="detail-animate">
              <h3 className="text-sm font-bold text-foreground mb-3">Cantidad</h3>
              <div className="inline-flex items-center gap-0 border border-zinc-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-foreground/50 hover:bg-zinc-100 hover:text-foreground transition-colors" aria-label="Reducir cantidad">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-foreground tabular-nums">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(99, q + 1))} className="w-10 h-10 flex items-center justify-center text-foreground/50 hover:bg-zinc-100 hover:text-foreground transition-colors" aria-label="Aumentar cantidad">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="detail-animate flex flex-col sm:flex-row gap-2.5 pt-3">
              <motion.a
                href={generateWhatsAppLink({ name: product.name, slug: product.slug, price: product.price, description: product.description || '' }, { quantity, productUrl })}
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
                onClick={() => { addToCart({ id: product._id, slug: product.slug, name: product.name, price: product.price, image: currentMainImage, categoryLabel, description: product.description || '' }); showToast('Agregado al carrito'); }}
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
                { icon: Truck, label: 'Envio a Todo Peru' },
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

        {/* Related Products */}
        {related.length > 0 && (
          <div id="producto-relacionados" className="scroll-mt-16">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Tambien te puede interesar</h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {related.map((rp) => {
                const rpImg = getImageUrl(rp.mainImage, 400, 400) || '';
                return (
                  <motion.div key={rp._id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="group cursor-pointer">
                    <Link href={`/coleccion/${rp.slug}`}>
                      <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 bg-zinc-100">
                        {rpImg && <img src={rpImg} alt={rp.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105" loading="lazy" />}
                        {rp.secondaryImage && (() => { const sec = getImageUrl(rp.secondaryImage, 400, 400); return sec ? <img src={sec} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100" loading="lazy" /> : null; })()}
                      </div>
                      <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">{rp.name}</h4>
                      <p className="text-sm font-bold text-primary">{formatPrice(rp.price)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={displayImages}
        isOpen={isLightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        productName={product.name}
        slug={product.slug}
        price={formatPrice(product.price)}
        onShare={handleShare}
      />
    </div>
  );
}
