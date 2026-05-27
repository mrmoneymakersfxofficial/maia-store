'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Heart, Gem, HandHeart, Star } from 'lucide-react';

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

  return (
    <div ref={sectionRef} className="relative pt-20 pb-32 sm:pb-24 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Page Header */}
        <div className="text-center mb-12 pt-4">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-600 mb-3 block">
            Nuestra Historia
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Artesanía que <span className="text-gradient-turquoise">Transforma</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="text-sm text-foreground/40 max-w-lg mx-auto">
            Conoce la historia detrás de cada pieza y el talento de las artesanas que hacen posible la magia de Maia Store.
          </motion.p>
          <div className="section-divider mx-auto mt-5" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src="/images/hero-craft.jpg" alt="Artesana tejiendo joyas a mano en Perú" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            </div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="absolute -bottom-4 -right-4 sm:right-4 bg-white rounded-xl p-4 shadow-xl border border-zinc-100/60">
              <p className="text-2xl font-bold text-primary">5+</p>
              <p className="text-[10px] text-foreground/50 font-medium">Años de Experiencia</p>
            </motion.div>
          </div>

          <div className="space-y-5">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }} className="text-sm text-foreground/60 leading-relaxed">
              En <strong className="text-foreground">Maia Store</strong>, cada joya que creamos es el resultado de horas de trabajo minucioso y pasión por el arte textil. Nacimos con la misión de llevar la belleza de las técnicas artesanales peruanas al mundo de la joyería contemporánea. Lo que comenzó como un pequeño taller familiar en Lima se ha convertido en una marca que llega a todo el Perú.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="text-sm text-foreground/60 leading-relaxed">
              Nuestras artesanas combinan técnicas ancestrales con diseños modernos, utilizando materiales de primera calidad para crear piezas que no solo adornan, sino que cuentan historias. Cada colección está inspirada en la rica cultura peruana: desde los textiles precolombinos hasta los paisajes de la costa, sierra y selva.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }} className="text-sm text-foreground/60 leading-relaxed">
              Creemos que el verdadero lujo está en la autenticidad, en saber que cada pieza que llevas fue creada con dedicación exclusivamente para ti. Trabajamos con comunidades artesanales de diferentes regiones del Perú, garantizando comercio justo y empoderando a las mujeres que mantienen viva esta tradición milenaria.
            </motion.p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} className="group p-5 rounded-2xl bg-white/50 border border-zinc-100/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-turquoise-50 flex items-center justify-center mb-3 group-hover:bg-turquoise-100 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-turquoise-600" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1.5">{feature.title}</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
