'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, ShoppingBag, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/store-data';
import { ve } from '@/lib/ve';
import InfiniteMarquee from '@/components/maia/InfiniteMarquee';

// ─── Types ─────────────────────────────────────────────────────
export interface SanityHeroSlide {
  _id: string;
  title?: string;
  subtitle?: any;
  bgImage?: string | null;
  mobileImage?: string | null;
  ctaLabel?: string;
  ctaLink?: string;
  ctaType?: string;
  order?: number;
}

export interface SanityProduct {
  _id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description?: string;
  longDescription?: string;
  mainImage?: string | null;
  secondaryImage?: string | null;
  gallery?: Array<{ url?: string; alt?: string }>;
  category?: { _id: string; name: string; slug: string } | null;
  color?: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  sku?: string;
  inStock?: boolean;
  collection?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SanityTestimonial {
  _id: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  quote?: any;
  photo?: string | null;
  rating?: number;
  featured?: boolean;
  order?: number;
  product?: { _id: string; name: string; slug: string } | null;
}

export interface HomeData {
  heroSlides: SanityHeroSlide[];
  featuredProducts: SanityProduct[];
  testimonials: SanityTestimonial[];
  useFallback: boolean;
}

// ─── Fallback hero slides (when Sanity has no heroSlides) ─────
const FALLBACK_HERO_SLIDES: SanityHeroSlide[] = [
  { _id: 'fallback-hero-0', bgImage: '/images/hero-craft.webp', mobileImage: '/images/hero-craft-mobile.webp', order: 0 },
  { _id: 'fallback-hero-1', bgImage: '/images/hero-slide-1.webp', mobileImage: '/images/hero-slide-1-mobile.webp', order: 1 },
  { _id: 'fallback-hero-2', bgImage: '/images/hero-slide-2.webp', mobileImage: '/images/hero-slide-2-mobile.webp', order: 2 },
];

export default function HomePage({ data }: { data: HomeData }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = data.heroSlides.length > 0 ? data.heroSlides : FALLBACK_HERO_SLIDES;
  const featured = data.featuredProducts;
  const testimonials = data.testimonials;
  const useFallback = data.useFallback;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsap = (await import('gsap')).default;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3 })
          .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
          .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3');
      }, heroRef);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section id="hero" ref={heroRef} className="relative w-full h-screen overflow-hidden scroll-mt-16">
        <div className="absolute inset-0" aria-hidden="true">
          {heroSlides.map((slide, i) => (
            <div
              key={slide._id}
              {...(slide._id.startsWith('fallback-') ? {} : ve(slide._id, 'heroSlide', 'backgroundImage'))}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url('${slide.bgImage || ''}')`,
                opacity: i === currentSlide ? 1 : 0,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background/60 to-transparent" />

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((slide, i) => (
            <button
              key={slide._id}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-6 bg-white/80' : 'w-2 bg-white/30'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-turquoise-300" />
            <span {...ve('siteSettings', 'siteSettings', 'tagline')} className="text-sm font-medium text-white/80">
              Artesania Peruana de Lujo
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            {...ve('siteSettings', 'siteSettings', 'slogan')}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6 text-white"
            style={{ opacity: 0 }}
          >
            Joyas Tejidas
            <br />
            <span className="text-gradient-turquoise">a Mano</span>
          </h1>

          <p
            ref={subtitleRef}
            {...ve('siteSettings', 'siteSettings', 'tagline')}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Cada pieza cuenta una historia. Descubre nuestra coleccion exclusiva de joyeria artesanal, tejida con amor y dedicacion en Peru.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3" style={{ opacity: 0 }}>
            <motion.button
              onClick={() => router.push('/coleccion')}
              className="bg-primary text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-turquoise-500/30 hover:bg-turquoise-600 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver Coleccion
            </motion.button>
            <Link
              href="/comprar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              Como Comprar
            </Link>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <button
            onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors"
            aria-label="Explorar"
          >
            <span className="text-[10px] font-medium tracking-widest uppercase">Explorar</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* ═══ FEATURED ═══ */}
      <section id="featured-products" className="py-20 sm:py-28 lg:py-36 scroll-mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-600 mb-3 block">Destacados</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Piezas <span className="text-gradient-turquoise">Favoritas</span>
            </h2>
            <p className="text-foreground/40 text-sm max-w-md mx-auto">
              Las joyas mas queridas por nuestras clientas. Calidad artesanal que habla por si sola.
            </p>
            <div className="section-divider mx-auto mt-5" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {featured.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/coleccion/${product.slug}`}>
                  <div
                    {...ve(product._id, 'product', 'mainImage')}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-zinc-100"
                  >
                    <img
                      src={product.mainImage || '/images/placeholder.webp'}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.secondaryImage && (
                      <img
                        src={product.secondaryImage}
                        alt={`${product.name} - vista alternativa`}
                        {...ve(product._id, 'product', 'secondaryImage')}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-semibold text-turquoise-700">
                        {product.category?.name || 'Joyas'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={(e) => { e.preventDefault(); toggleFavorite(product._id); }}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                        whileTap={{ scale: 0.85 }}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(product._id) ? 'text-red-500 fill-red-500' : 'text-foreground/60'}`} fill={isFavorite(product._id) ? 'currentColor' : 'none'} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => { e.preventDefault(); addToCart({ id: product._id as any, slug: product.slug, name: product.name, price: product.price, image: product.mainImage || '', imageSecondary: product.secondaryImage || '', category: product.category?.name || '', categoryLabel: product.category?.name || '', description: product.description || '', longDescription: product.longDescription || '', features: product.features || [], color: { name: product.color || '' }, images: (product.gallery || []).map(g => ({ original: g.url || '', thumbnail: g.url || '' })), rating: product.rating || 5, reviews: product.reviewCount || 0, sku: product.sku || '', collection: product.collection || '' } as any); }}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg"
                        whileTap={{ scale: 0.85 }}
                      >
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="px-1">
                    <h3 {...ve(product._id, 'product', 'name')} className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5">
                      {product.name}
                    </h3>
                    <p {...ve(product._id, 'product', 'description')} className="text-xs text-foreground/40 mb-2 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span {...ve(product._id, 'product', 'price')} className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                      <span className="text-xs font-medium text-turquoise-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Ver mas <ArrowDown className="w-3 h-3 rotate-[-90deg]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/coleccion" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-turquoise-500/20 hover:bg-turquoise-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              Ver Toda la Coleccion
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonios" className="py-20 sm:py-28 lg:py-36 scroll-mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-600 mb-3 block">Testimonios</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Lo que Dicen <span className="text-gradient-turquoise">Nuestras Clientas</span>
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="mb-5">
            <InfiniteMarquee speed={40} className="py-1">
              {testimonials.slice(0, 6).map((t, i) => (
                <TestimonialCard key={`r1-${t._id}-${i}`} testimonial={t} />
              ))}
            </InfiniteMarquee>
          </div>
          <div>
            <InfiniteMarquee speed={35} direction="right" className="py-1">
              {[...testimonials].reverse().slice(0, 6).map((t, i) => (
                <TestimonialCard key={`r2-${t._id}-${i}`} testimonial={t} />
              ))}
            </InfiniteMarquee>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Testimonial Card ────────────────────────────────────────
function TestimonialCard({ testimonial: t }: { testimonial: SanityTestimonial }) {
  const text = typeof t.quote === 'string' ? t.quote : Array.isArray(t.quote) ? t.quote.map((b: any) => b.children?.map((c: any) => c.text).join('') || '').join(' ') : '';
  const name = t.authorName || '';
  const location = t.company || t.authorRole || '';
  const rating = t.rating || 5;

  return (
    <div {...ve(t._id, 'testimonial', 'quote')} className="flex-shrink-0 w-[320px] sm:w-[380px] p-5 rounded-2xl bg-zinc-50/60 border border-zinc-100/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: rating }).map((_, j) => (
          <svg key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
        ))}
      </div>
      <p className="text-foreground/60 text-xs leading-relaxed mb-4 line-clamp-3">{text}</p>
      <div className="flex items-center gap-2.5 pt-3 border-t border-zinc-100">
        <div className="w-8 h-8 rounded-full bg-turquoise-100 flex items-center justify-center">
          {t.photo ? (
            <img src={t.photo} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-xs font-bold text-turquoise-700">{name.charAt(0)}</span>
          )}
        </div>
        <div>
          <p {...ve(t._id, 'testimonial', 'authorName')} className="text-xs font-semibold text-foreground">{name}</p>
          <p {...ve(t._id, 'testimonial', 'company')} className="text-[10px] text-foreground/40">{location}</p>
        </div>
      </div>
    </div>
  );
}