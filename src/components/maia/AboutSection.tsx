'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Heart, Gem, HandHeart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: HandHeart,
    title: '100% Artesanal',
    description:
      'Cada joya es tejida a mano por artesanas peruanas con técnicas ancestrales transmitidas de generación en generación, garantizando autenticidad y exclusividad en cada puntada.',
  },
  {
    icon: Gem,
    title: 'Materiales Premium',
    description:
      'Utilizamos hilos de alta resistencia, cuentas de cristal y acabados en oro y plata que aseguran durabilidad y un brillo incomparable que perdura en el tiempo.',
  },
  {
    icon: Heart,
    title: 'Hecho con Amor',
    description:
      'Más que joyas, creamos piezas que llevan la energía y el cariño de nuestras artesanas. Cada diseño es único, pensado para resaltar tu personalidad y estilo.',
  },
  {
    icon: Star,
    title: 'Diseños Exclusivos',
    description:
      'Nuestras colecciones son limitadas y renovadas constantemente. No encontrarás dos piezas idénticas, lo que convierte cada joya en una verdadera obra de arte portátil.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, y: 30 },
        {
          scale: 1,
          y: 0,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="nosotros" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-turquoise-50/30 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-600 mb-4"
          >
            Nuestra Historia
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Artesanía que{' '}
            <span className="text-gradient-turquoise">Transforma</span>
          </motion.h2>
          <div className="section-divider mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-turquoise-500/10">
              <Image
                src="/images/hero-craft.jpg"
                alt="Artesana tejiendo joyas a mano en Perú"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-turquoise-900/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 sm:right-6 bg-white rounded-2xl p-5 shadow-xl shadow-turquoise-500/10 border border-turquoise-100"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5+</p>
                <p className="text-sm text-foreground/60 font-medium">Años de<br />Experiencia</p>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-foreground/70 leading-relaxed"
            >
              En <strong className="text-foreground">Maia Store</strong>, cada joya que creamos
              es el resultado de horas de trabajo minucioso y pasión por el arte textil. Nacimos
              con la misión de llevar la belleza de las técnicas artesanales peruanas al mundo de
              la joyería contemporánea.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-foreground/70 leading-relaxed"
            >
              Nuestras artesanas combinan técnicas ancestrales con diseños modernos, utilizando
              materiales de primera calidad para crear piezas que no solo adornan, sino que
              cuentan historias. Cada colección está inspirada en la rica cultura peruana y la
              belleza natural de nuestra tierra.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-foreground/70 leading-relaxed"
            >
              Creemos que la verdadera lujo está en la autenticidad, en saber que cada pieza que
              llevas fue creada con dedicación exclusivamente para ti.
            </motion.p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="group relative p-6 rounded-2xl bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-xl hover:shadow-turquoise-500/5"
            >
              <div className="w-14 h-14 rounded-xl bg-turquoise-50 flex items-center justify-center mb-4 group-hover:bg-turquoise-100 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-turquoise-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
