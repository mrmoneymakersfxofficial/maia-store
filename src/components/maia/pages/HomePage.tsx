'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, ShoppingBag, Heart } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { RouterLink } from '@/lib/router';
import { useStore } from '@/lib/store-context';
import { products, testimonials, formatPrice } from '@/lib/store-data';
import InfiniteMarquee from '@/components/maia/InfiniteMarquee';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { navigate } = useRouter();
  const { isFavorite, toggleFavorite, addToCart } = useStore();

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import('gsap')).default;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.3 }
        )
          .fromTo(
            subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            '-=0.5'
          )
          .fromTo(
            ctaRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            '-=0.3'
          );
      }, heroRef);
    })();

    return () => ctx?.revert();
  }, []);

  const featured = products.slice(0, 6);

  return (
    <>
      {/* ═══ HERO — FULL BLEED ═══ */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-craft.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background/60 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-turquoise-300" />
            <span className="text-sm font-medium text-white/80">Artesania Peruana de Lujo</span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6 text-white"
            style={{ opacity: 0 }}
          >
            Joyas Tejidas
            <br />
            <span className="text-gradient-turquoise">a Mano</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Cada pieza cuenta una historia. Descubre nuestra coleccion exclusiva de joyeria artesanal, tejida con amor y dedicacion en Peru.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3" style={{ opacity: 0 }}>
            <motion.button
              onClick={() => navigate('#/coleccion')}
              className="bg-primary text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-turquoise-500/30 hover:bg-turquoise-600 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver Coleccion
            </motion.button>
            <motion.button
              onClick={() => navigate('#/comprar')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingBag className="w-5 h-5" />
              Como Comprar
            </motion.button>
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

      {/* ═══ FEATURED — EDITORIAL STYLE ═══ */}
      <section id="featured-products" className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-600 mb-3 block">
              Destacados
            </span>
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
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`#/coleccion/${product.slug}`)}
              >
                {/* Image — dual hover effect */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-zinc-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.imageSecondary && (
                    <img
                      src={product.imageSecondary}
                      alt={`${product.name} - vista alternativa`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-semibold text-turquoise-700">
                      {product.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                      whileTap={{ scale: 0.85 }}
                    >
                      <Heart
                        className={`w-5 h-5 ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-foreground/60'}`}
                        fill={isFavorite(product.id) ? 'currentColor' : 'none'}
                      />
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg"
                      whileTap={{ scale: 0.85 }}
                    >
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>

                <div className="px-1">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-foreground/40 mb-2 line-clamp-1">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                    <span className="text-xs font-medium text-turquoise-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      Ver mas <ArrowDown className="w-3 h-3 rotate-[-90deg]" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <RouterLink
              to="#/coleccion"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-turquoise-500/20 hover:bg-turquoise-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver Toda la Coleccion
            </RouterLink>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — INFINITE MARQUEE ═══ */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-600 mb-3 block">
              Testimonios
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Lo que Dicen <span className="text-gradient-turquoise">Nuestras Clientas</span>
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          {/* Row 1 — Left */}
          <div className="mb-5">
            <InfiniteMarquee speed={40} className="py-1">
              {testimonials.slice(0, 6).map((t, i) => (
                <TestimonialCard key={`r1-${i}`} testimonial={t} />
              ))}
            </InfiniteMarquee>
          </div>

          {/* Row 2 — Right (duplicated & reversed) */}
          <div>
            <InfiniteMarquee speed={35} direction="right" className="py-1">
              {[...testimonials].reverse().slice(0, 6).map((t, i) => (
                <TestimonialCard key={`r2-${i}`} testimonial={t} />
              ))}
            </InfiniteMarquee>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Testimonial Card ────────────────────────────────────────

function TestimonialCard({ testimonial: t }: { testimonial: { name: string; location: string; text: string; rating: number } }) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] p-5 rounded-2xl bg-zinc-50/60 border border-zinc-100/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, j) => (
          <svg key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
        ))}
      </div>
      <p className="text-foreground/60 text-xs leading-relaxed mb-4 line-clamp-3">{t.text}</p>
      <div className="flex items-center gap-2.5 pt-3 border-t border-zinc-100">
        <div className="w-8 h-8 rounded-full bg-turquoise-100 flex items-center justify-center">
          <span className="text-xs font-bold text-turquoise-700">{t.name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">{t.name}</p>
          <p className="text-[10px] text-foreground/40">{t.location}</p>
        </div>
      </div>
    </div>
  );
}
