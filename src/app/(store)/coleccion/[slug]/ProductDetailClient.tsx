'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, ShoppingBag, Star, Check, Heart, Truck, ShieldCheck, ChevronRight, Share2, ZoomIn, Minus, Plus } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { useToast } from '@/lib/toast-context';
import { formatPrice, generateWhatsAppLink } from '@/lib/store-data';
import { shareProduct } from '@/lib/share';
import { ve } from '@/lib/ve';
import { getSwatchColor } from '@/lib/colors';
import Lightbox from '@/components/maia/Lightbox';
import type { ProductData } from './page';

interface Props {
  product: ProductData;
  allProducts: ProductData[];
  useFallback?: boolean;
}

export default function ProductDetailClient({ product: initialProduct, allProducts, useFallback }: Props) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const { showToast } = useToast();
  const product = initialProduct;
  const pageRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productUrl, setProductUrl] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const [activeVariant, setActiveVariant] = useState<ProductData | null>(product);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find variants (same collection, different color)
  const variants = useMemo(() => {
    return allProducts.filter(p => p.collection === product.collection && p._id !== product._id && p.color?.name !== product.color?.name);
  }, [product, allProducts]);

  // Gallery images
  const variantImages = useMemo(() => {
    if (!activeVariant) return [];
    const imgs = activeVariant.gallery?.length ? activeVariant.gallery : [{ original: activeVariant.mainImage, thumbnail: activeVariant.mainImage }];
    return imgs.map(img => ({ src: img.original, alt: `${activeVariant.name}`, thumb: img.thumbnail }));
  }, [activeVariant]);

  const currentMainImage = variantImages[selectedImageIndex]?.src || activeVariant?.mainImage || '';

  useEffect(() => {
    if (product) { setActiveVariant(product); setSelectedImageIndex(0); setQuantity(1); if (typeof window !== 'undefined') setProductUrl(window.location.href); }
  }, [product._id]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [product.slug]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsap = (await import('gsap')).default;
      if (!pageRef.current) return;
      ctx = gsap.context(() => { gsap.fromTo('.detail-animate', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }); }, pageRef);
    })();
    return () => ctx?.revert();
  }, [product.slug]);

  const handleShare = async () => {
    if (!activeVariant) return;
    const ok = await shareProduct(activeVariant.name, activeVariant.slug, formatPrice(activeVariant.price));
    if (ok) { const canShare = typeof window !== 'undefined' && !!navigator.share; showToast(canShare ? 'Compartido!' : 'Enlace copiado al portapapeles'); }
  };

  const switchVariant = useCallback((variant: ProductData) => { setActiveVariant(variant); setSelectedImageIndex(0); router.replace(`/coleccion/${variant.slug}`, { scroll: false }); }, [router]);
  const handleMainImageClick = useCallback(() => { if (!activeVariant) return; setLightboxIndex(selectedImageIndex); setIsLightboxOpen(true); }, [activeVariant, selectedImageIndex]);
  const handleThumbnailClick = useCallback((index: number) => { setSelectedImageIndex(index); }, []);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => { if (!imageRef.current) return; const rect = imageRef.current.getBoundingClientRect(); setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 }); };

  // Related products
  const variantIds = new Set(variants.map(v => v._id));
  const related = activeVariant
    ? allProducts.filter(r => r._id !== activeVariant._id && !variantIds.has(r._id)).slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Producto no encontrado</h1>
          <p className="text-foreground/50 mb-8">La joya que buscas no existe o fue removida.</p>
          <Link href="/coleccion" className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-turquoise-600 transition-colors">Ver Coleccion</Link>
        </div>
      </div>
    );
  }

  const displayProduct = activeVariant || product;
  const cartItem: any = { id: displayProduct._id, slug: displayProduct.slug, name: displayProduct.name, price: displayProduct.price, image: displayProduct.mainImage, imageSecondary: displayProduct.secondaryImage || '', category: displayProduct.categorySlug, categoryLabel: displayProduct.categoryLabel, description: displayProduct.description, longDescription: displayProduct.longDescription, features: displayProduct.features, color: displayProduct.color, images: displayProduct.gallery, rating: displayProduct.rating, reviews: displayProduct.reviews, sku: displayProduct.sku, collection: displayProduct.collection };

  return (
    <div ref={pageRef} className="relative pt-16 pb-20 sm:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <nav className="flex items-center gap-1.5 text-xs text-foreground/40 mb-4 pt-2 detail-animate">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/coleccion" className="hover:text-primary transition-colors">Coleccion</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/coleccion?categoria=${displayProduct.categorySlug}`} className="hover:text-primary transition-colors capitalize">{displayProduct.categoryLabel}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/60 font-medium truncate max-w-[140px]">{displayProduct.name}</span>
        </nav>

        <button onClick={() => router.back()} className="detail-animate inline-flex items-center gap-1.5 text-xs font-medium text-foreground/40 hover:text-primary transition-colors mb-6 group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Volver a la Coleccion
        </button>

        <div id="producto-detalle" className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20 lg:mb-28 scroll-mt-16">
          {/* Image Gallery */}
          <div className="detail-animate">
            <div ref={imageRef} {...ve(displayProduct._id, 'product', 'mainImage')} className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 cursor-zoom-in" onClick={handleMainImageClick} onMouseEnter={() => setIsZooming(true)} onMouseLeave={() => setIsZooming(false)} onMouseMove={handleMouseMove}>
              <AnimatePresence mode="wait">
                <motion.img key={currentMainImage} src={currentMainImage} alt={displayProduct.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="w-full h-full object-cover transition-transform duration-300" style={isZooming ? { transform: 'scale(1.8)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : { transform: 'scale(1)' }} />
              </AnimatePresence>
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <ZoomIn className="w-5 h-5 text-foreground/60" />
              </div>
            </div>
            {variantImages.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {variantImages.map((img, i) => (
                  <button key={i} onClick={() => handleThumbnailClick(i)} className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === selectedImageIndex ? 'border-primary ring-1 ring-primary/30' : 'border-zinc-200 opacity-50 hover:opacity-90'}`}>
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
                <motion.button onClick={() => toggleFavorite(displayProduct._id)} className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center" whileTap={{ scale: 0.85 }}>
                  <Heart className={`w-5 h-5 transition-colors ${isFavorite(displayProduct._id) ? 'text-red-500 fill-red-500' : 'text-foreground/30'}`} fill={isFavorite(displayProduct._id) ? 'currentColor' : 'none'} />
                </motion.button>
                <motion.button onClick={handleShare} className="w-10 h-10 rounded-full bg-turquoise-50 flex items-center justify-center" whileTap={{ scale: 0.85 }}>
                  <Share2 className="w-5 h-5 text-primary" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(displayProduct.rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-200 fill-zinc-200'}`} />
                  ))}
                </div>
                <span className="text-xs text-foreground/40">{displayProduct.rating} ({displayProduct.reviews} resenas)</span>
              </div>

              <h1 {...ve(displayProduct._id, 'product', 'name')} className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">{displayProduct.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <p {...ve(displayProduct._id, 'product', 'price')} className="text-2xl font-bold text-primary">{formatPrice(displayProduct.price)}</p>
                {displayProduct.compareAtPrice && displayProduct.compareAtPrice > displayProduct.price && (
                  <p className="text-lg text-foreground/30 line-through">{formatPrice(displayProduct.compareAtPrice)}</p>
                )}
              </div>
              <p {...ve(displayProduct._id, 'product', 'longDescription')} className="text-sm text-foreground/60 leading-relaxed">{displayProduct.longDescription || displayProduct.description}</p>
            </div>

            {variants.length > 1 && (
              <div className="detail-animate">
                <h3 className="text-sm font-bold text-foreground mb-3">Color: <span className="font-normal text-foreground/60">{displayProduct.color.name}</span></h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {variants.map((variant) => {
                    const isActive = variant._id === displayProduct._id;
                    const swatchColor = getSwatchColor(variant.color?.name);
                    return (
                      <motion.button key={variant._id} onClick={() => switchVariant(variant)} className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${isActive ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-zinc-200 hover:border-primary/50 hover:scale-105'}`} whileTap={{ scale: 0.92 }} title={variant.color.name}>
                        <span className="w-7 h-7 rounded-full block" style={{ backgroundColor: swatchColor }} />
                        {isActive && (<motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center"><Check className="w-4 h-4 text-primary" strokeWidth={3} /></motion.span>)}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="detail-animate">
              <h3 className="text-sm font-bold text-foreground mb-2.5">Caracteristicas</h3>
              <ul className="space-y-2">
                {displayProduct.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-foreground/60">
                    <Check className="w-4 h-4 text-turquoise-500 flex-shrink-0 mt-0.5" />{feat}
                  </li>
                ))}
              </ul>
            </div>

            {displayProduct.sku && (
              <div className="detail-animate">
                <span {...ve(displayProduct._id, 'product', 'sku')} className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-[10px] font-mono font-medium text-foreground/40">SKU: {displayProduct.sku}</span>
              </div>
            )}

            <div className="detail-animate">
              <h3 className="text-sm font-bold text-foreground mb-3">Cantidad</h3>
              <div className="inline-flex items-center gap-0 border border-zinc-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-foreground/50 hover:bg-zinc-100 hover:text-foreground transition-colors" aria-label="Reducir cantidad"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center text-sm font-semibold text-foreground tabular-nums">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(99, q + 1))} className="w-10 h-10 flex items-center justify-center text-foreground/50 hover:bg-zinc-100 hover:text-foreground transition-colors" aria-label="Aumentar cantidad"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="detail-animate flex flex-col sm:flex-row gap-2.5 pt-3">
              <motion.a href={generateWhatsAppLink(cartItem, { quantity, productUrl })} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-green-500/15" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <MessageCircle className="w-4 h-4" /> Pedir por WhatsApp
              </motion.a>
              <motion.button onClick={() => { addToCart(cartItem); showToast('Agregado al carrito'); }} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-turquoise-600 text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-turquoise-500/15" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <ShoppingBag className="w-4 h-4" /> Agregar al Carrito
              </motion.button>
            </div>

            <div className="detail-animate grid grid-cols-3 gap-2 pt-3">
              {[{ icon: ShieldCheck, label: 'Pago Seguro' }, { icon: Truck, label: 'Envio a Todo Peru' }, { icon: Heart, label: 'Hecho con Amor' }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center p-2.5 rounded-xl bg-turquoise-50/60">
                  <Icon className="w-5 h-5 text-turquoise-600 mb-1" />
                  <span className="text-[10px] font-medium text-foreground/50">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div id="producto-relacionados" className="scroll-mt-16">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Tambien te puede interesar</h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {related.map((rp) => (
                <motion.div key={rp._id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="group cursor-pointer">
                  <Link href={`/coleccion/${rp.slug}`}>
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 bg-zinc-100">
                      <img src={rp.mainImage} alt={rp.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105" loading="lazy" />
                      {rp.secondaryImage && <img src={rp.secondaryImage} alt={`${rp.name} - vista alternativa`} className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100" loading="lazy" />}
                    </div>
                    <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">{rp.name}</h4>
                    <p className="text-sm font-bold text-primary">{formatPrice(rp.price)}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeVariant && (
        <Lightbox images={variantImages} isOpen={isLightboxOpen} initialIndex={lightboxIndex} onClose={() => setIsLightboxOpen(false)} productName={activeVariant.name} slug={activeVariant.slug} price={formatPrice(activeVariant.price)} onShare={handleShare} />
      )}
    </div>
  );
}

function mapToProductData(v: any): ProductData {
  return v;
}