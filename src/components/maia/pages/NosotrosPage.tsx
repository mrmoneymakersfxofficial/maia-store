'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Heart, Gem, HandHeart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: HandHeart, title: '100% Artesanal', description: 'Cada joya es tejida a mano por artesanas peruanas con técnicas ancestrales transmitidas de generación en generación, garantizando autenticidad y exclusividad en cada puntada. El proceso artesanal asegura que ninguna dos piezas sean exactamente iguales, dándote una joya verdaderamente única.' },
  { icon: Gem, title: 'Materiales Premium', description: 'Utilizamos hilos de alta resistencia, cuentas de cristal de Bohemia y acabados en oro y plata 925 que aseguran durabilidad y un brillo incomparable que perdura en el tiempo. Cada material es cuidadosamente seleccionado para cumplir nuestros estándares de calidad premium.' },
  { icon: Heart, title: 'Hecho con Amor', description: 'Más que joyas, creamos piezas que llevan la energía y el cariño de nuestras artesanas. Cada diseño es único, pensado para resaltar tu personalidad y estilo. El amor se refleja en cada detalle, desde la primera puntada hasta el empaque final.' },
  { icon: Star, title: 'Diseños Exclusivos', description: 'Nuestras colecciones son limitadas y renovadas constantemente. No encontrarás dos piezas idénticas, lo que convierte cada joya en una verdadera obra de arte portátil. Cada diseño está inspirado en elementos de la cultura peruana y la naturaleza.' },
];

export default function NosotrosPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, { scale: 1.1, y: 30 }, { scale: 1, y: 0, scrollTrigger: { trigger: imageRef.current, start: 'top 80%', end: 'bottom 60%', scrub: 1 } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative pt-32 pb-24 sm:pb-32 overflow-hidden">
      {/* Hero Banner */}
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-turquoise-50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-600 mb-4">
            Nuestra Historia
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Artesanía que <span className="text-gradient-turquoise">Transforma</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Conoce la historia detrás de cada pieza y el talento de las artesanas que hacen posible la magia de Maia Store.
          </motion.p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-turquoise-500/10">
              <Image src="/images/hero-craft.jpg" alt="Artesana tejiendo joyas a mano en Perú" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-turquoise-900/20 to-transparent" />
            </div>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="absolute -bottom-6 -right-6 sm:right-6 bg-white rounded-2xl p-5 shadow-xl shadow-turquoise-500/10 border border-turquoise-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5+</p>
                <p className="text-sm text-foreground/60 font-medium">Años de<br />Experiencia</p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
              En <strong className="text-foreground">Maia Store</strong>, cada joya que creamos es el resultado de horas de trabajo minucioso y pasión por el arte textil. Nacimos con la misión de llevar la belleza de las técnicas artesanales peruanas al mundo de la joyería contemporánea. Lo que comenzó como un pequeño taller familiar en Lima se ha convertido en una marca que llega a todo el Perú.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
              Nuestras artesanas combinan técnicas ancestrales con diseños modernos, utilizando materiales de primera calidad para crear piezas que no solo adornan, sino que cuentan historias. Cada colección está inspirada en la rica cultura peruana: desde los textiles precolombinos hasta los paisajes de la costa, sierra y selva.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
              Creemos que el verdadero lujo está en la autenticidad, en saber que cada pieza que llevas fue creada con dedicación exclusivamente para ti. Trabajamos con comunidades artesanales de diferentes regiones del Perú, garantizando comercio justo y empoderando a las mujeres que mantienen viva esta tradición milenaria.
            </motion.p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }} className="group relative p-6 rounded-2xl bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-xl hover:shadow-turquoise-500/5">
              <div className="w-14 h-14 rounded-xl bg-turquoise-50 flex items-center justify-center mb-4 group-hover:bg-turquoise-100 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-turquoise-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
