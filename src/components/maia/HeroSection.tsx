'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Floating animation for decorative elements
      gsap.to('.hero-float-1', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-float-2', {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
      gsap.to('.hero-float-3', {
        y: -25,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-turquoise-50 via-background to-turquoise-50/30" />

      {/* Animated decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-turquoise-100/40 blur-3xl hero-float-1" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-turquoise-200/30 blur-3xl hero-float-2" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-turquoise-100/50 blur-2xl hero-float-3" />

      {/* Decorative spinning ring */}
      <div ref={decorRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] pointer-events-none">
        <div className="w-full h-full rounded-full border border-turquoise-200/20 animate-spin-slow" />
        <div className="absolute inset-8 rounded-full border border-turquoise-300/15 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <div className="absolute inset-16 rounded-full border border-dashed border-turquoise-200/20 animate-spin-slow" style={{ animationDuration: '40s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turquoise-50 border border-turquoise-200/50 mb-8"
        >
          <Sparkles className="w-4 h-4 text-turquoise-600" />
          <span className="text-sm font-medium text-turquoise-700">
            Artesanía Peruana de Lujo
          </span>
        </motion.div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
          style={{ opacity: 0 }}
        >
          <span className="text-foreground">Joyas Tejidas</span>
          <br />
          <span className="text-gradient-turquoise">a Mano</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ opacity: 0 }}
        >
          Cada pieza cuenta una historia. Descubre nuestra colección exclusiva de
          joyería artesanal, tejida con amor y dedicación en Perú.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ opacity: 0 }}>
          <motion.a
            href="#coleccion"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#coleccion')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-turquoise-500/30 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Ver Colección</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-turquoise-400 to-turquoise-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.a>

          <motion.a
            href="https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Quisiera%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold border-2 border-primary/20 text-primary hover:bg-turquoise-50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactar por WhatsApp
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <a
          href="#nosotros"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#nosotros')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-2 text-foreground/30 hover:text-primary transition-colors"
          aria-label="Desplazarse hacia abajo"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
}
