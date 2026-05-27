'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, ShoppingBag } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { RouterLink } from '@/lib/router';
import { products, formatPrice } from '@/lib/store-data';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const { navigate } = useRouter();

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import('gsap')).default;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          titleRef.current,
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, delay: 0.3 }
        )
          .fromTo(
            subtitleRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.6'
          )
          .fromTo(
            ctaRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.4'
          )
          .fromTo(
            decorRef.current,
            { scale: 0, opacity: 0, rotation: -180 },
            { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
            '-=0.8'
          );

        gsap.to('.hero-float-1', { y: -20, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.hero-float-2', { y: -15, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
        gsap.to('.hero-float-3', { y: -25, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
      }, heroRef);
    })();

    return () => ctx?.revert();
  }, []);

  const featured = products.slice(0, 3);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-turquoise-50 via-background to-turquoise-50/30" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-turquoise-100/40 blur-3xl hero-float-1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-turquoise-200/30 blur-3xl hero-float-2" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-turquoise-100/50 blur-2xl hero-float-3" />

        <div ref={decorRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] pointer-events-none">
          <div className="w-full h-full rounded-full border border-turquoise-200/20 animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-turquoise-300/15 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
          <div className="absolute inset-16 rounded-full border border-dashed border-turquoise-200/20 animate-spin-slow" style={{ animationDuration: '40s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turquoise-50 border border-turquoise-200/50 mb-8">
            <Sparkles className="w-4 h-4 text-turquoise-600" />
            <span className="text-sm font-medium text-turquoise-700">Artesanía Peruana de Lujo</span>
          </motion.div>

          <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6" style={{ opacity: 0 }}>
            <span className="text-foreground">Joyas Tejidas</span>
            <br />
            <span className="text-gradient-turquoise">a Mano</span>
          </h1>

          <p ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed" style={{ opacity: 0 }}>
            Cada pieza cuenta una historia. Descubre nuestra colección exclusiva de joyería artesanal, tejida con amor y dedicación en Perú.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ opacity: 0 }}>
            <motion.button
              onClick={() => navigate('#/coleccion')}
              className="group relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-turquoise-500/30 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Ver Colección</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-turquoise-400 to-turquoise-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            <motion.button
              onClick={() => navigate('#/comprar')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold border-2 border-primary/20 text-primary hover:bg-turquoise-50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-5 h-5" />
              Cómo Comprar
            </motion.button>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <button onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center gap-2 text-foreground/30 hover:text-primary transition-colors" aria-label="Desplazarse hacia abajo">
            <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
            <ArrowDown className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section id="featured-products" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-turquoise-50/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-600 mb-4">Destacados</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Piezas <span className="text-gradient-turquoise">Favoritas</span>
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">Las joyas más queridas por nuestras clientas. Calidad artesanal que habla por sí sola.</p>
            <div className="section-divider mx-auto mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group cursor-pointer"
                onClick={() => navigate(`#/coleccion/${product.slug}`)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-2xl hover:shadow-turquoise-500/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-turquoise-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-turquoise-700">{product.categoryLabel}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-turquoise-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-foreground/50 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                      <span className="text-sm font-semibold text-turquoise-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Ver más →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <RouterLink
              to="#/coleccion"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-turquoise-500/25 hover:shadow-turquoise-500/40 transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver Toda la Colección
            </RouterLink>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS PREVIEW ═══ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-turquoise-50/30 via-background to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-600 mb-4">Testimonios</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Lo que Dicen <span className="text-gradient-turquoise">Nuestras Clientas</span>
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Carla M.', loc: 'Lima, Perú', text: 'Las joyas de Maia Store son increíbles. El collar que me compré es precioso y recibo cumplidos siempre que lo uso. ¡Totalmente recomendado!', r: 5 },
              { name: 'Lucía R.', loc: 'Arequipa, Perú', text: 'Me encantó la atención personalizada por WhatsApp. Me ayudaron a elegir el regalo perfecto para mi mamá. La calidad es excepcional.', r: 5 },
              { name: 'Andrea P.', loc: 'Cusco, Perú', text: 'Compré las pulseras para mis amigas y a todas les encantaron. El tejido es perfecto y los colores son preciosos. ¡Volveré a comprar!', r: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative p-6 rounded-2xl bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-xl hover:shadow-turquoise-500/5"
              >
                <div className="absolute -top-3 left-6 text-6xl font-serif text-turquoise-200/50">&ldquo;</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.r }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                  ))}
                </div>
                <p className="text-foreground/70 leading-relaxed text-sm mb-4">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-turquoise-50">
                  <div className="w-10 h-10 rounded-full bg-turquoise-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-turquoise-700">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-foreground/50">{t.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
