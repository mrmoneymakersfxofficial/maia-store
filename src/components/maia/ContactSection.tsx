'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Music, Phone, Mail, MapPin } from 'lucide-react';

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram',
    handle: '@maia_store81',
    href: 'https://instagram.com/maia_store81',
    color: 'hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600',
  },
  {
    icon: Music,
    label: 'TikTok',
    handle: 'maia_store81',
    href: 'https://tiktok.com/@maia_store81',
    color: 'hover:bg-slate-50 hover:border-slate-200 hover:text-slate-800',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    handle: '+51 977 333 858',
    href: 'https://wa.me/51977333858',
    color: 'hover:bg-green-50 hover:border-green-200 hover:text-green-600',
  },
];

const testimonials = [
  {
    name: 'Carla M.',
    location: 'Lima, Perú',
    text: 'Las joyas de Maia Store son increíbles. El collar que me compré es precioso y recibo cumplidos siempre que lo uso. ¡Totalmente recomendado!',
    rating: 5,
  },
  {
    name: 'Lucía R.',
    location: 'Arequipa, Perú',
    text: 'Me encantó la atención personalizada por WhatsApp. Me ayudaron a elegir el regalo perfecto para mi mamá. La calidad es excepcional.',
    rating: 5,
  },
  {
    name: 'Andrea P.',
    location: 'Cusco, Perú',
    text: 'Compré las pulseras para mis amigas y a todas les encantaron. El tejido es perfecto y los colores son preciosos. ¡Volveré a comprar!',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="contacto" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-turquoise-50/30 via-background to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-600 mb-4"
            >
              Testimonios
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Lo que Dicen{' '}
              <span className="text-gradient-turquoise">Nuestras Clientas</span>
            </motion.h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative p-6 rounded-2xl bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-xl hover:shadow-turquoise-500/5"
              >
                <div className="absolute -top-3 left-6 text-6xl font-serif text-turquoise-200/50">&ldquo;</div>
                <StarRating count={testimonial.rating} />
                <p className="mt-4 text-foreground/70 leading-relaxed text-sm mb-4">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-turquoise-50">
                  <div className="w-10 h-10 rounded-full bg-turquoise-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-turquoise-700">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-foreground/50 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/collection.jpg"
              alt="Colección de joyas artesanales"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-turquoise-800/90 to-turquoise-600/80" />
          </div>
          <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-20 text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              ¿Lista para Brillar?
            </h3>
            <p className="text-lg text-turquoise-100/90 max-w-xl mx-auto mb-8">
              Encuentra la joya perfecta que hable de ti. Contáctanos hoy y recibe
              asesoría personalizada para tu pieza ideal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Quisiera%20asesoría%20personalizada"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Escribir por WhatsApp
              </a>
              <a
                href="https://instagram.com/maia_store81"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/25 hover:bg-white/25 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
                Seguir en Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
