'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Phone, ChevronRight, MapPin } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { testimonials } from '@/lib/store-data';

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

export default function ContactoPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { navigate } = useRouter();

  return (
    <div ref={sectionRef} className="relative pt-32 pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-turquoise-50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-600 mb-4">
            Contáctanos
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Estamos Aquí <span className="text-gradient-turquoise">Para Ti</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o necesitas asesoría personalizada? No dudes en escribirnos. Te respondemos en minutos.
          </motion.p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Breadcrumb */}
        <motion.nav initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.25 }} className="flex items-center justify-center gap-2 text-sm text-foreground/50 mb-12">
          <button onClick={() => navigate('#/')} className="hover:text-primary transition-colors">Inicio</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Contacto</span>
        </motion.nav>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Phone, title: 'WhatsApp', detail: '+51 977 333 858', desc: 'Respuesta inmediata. Lunes a Sábado de 9am a 8pm.', href: 'https://wa.me/51977333858?text=Hola%20Maia%20Store!', color: 'bg-green-50 border-green-100 hover:border-green-200' },
            { icon: Instagram, title: 'Instagram', detail: '@maia_store81', desc: 'Síguenos para ver nuevas colecciones y ofertas exclusivas.', href: 'https://instagram.com/maia_store81', color: 'bg-pink-50 border-pink-100 hover:border-pink-200' },
            { icon: MapPin, title: 'Ubicación', detail: 'Perú', desc: 'Envíos a todo el país a través de Olva Courier y Shalom Express.', href: '#', color: 'bg-turquoise-50 border-turquoise-100 hover:border-turquoise-200' },
          ].map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border ${card.color} transition-all duration-500 hover:shadow-xl group`}
            >
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{card.title}</h3>
              <p className="text-base font-semibold text-primary mb-2">{card.detail}</p>
              <p className="text-sm text-foreground/60">{card.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Lo que Dicen <span className="text-gradient-turquoise">Nuestras Clientas</span>
            </h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="relative p-6 rounded-2xl bg-white border border-turquoise-100/50 hover:border-turquoise-200 transition-all duration-500 hover:shadow-xl hover:shadow-turquoise-500/5"
              >
                <div className="absolute -top-3 left-6 text-6xl font-serif text-turquoise-200/50">&ldquo;</div>
                <StarRating count={t.rating} />
                <p className="mt-4 text-foreground/70 leading-relaxed text-sm mb-4">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-turquoise-50">
                  <div className="w-10 h-10 rounded-full bg-turquoise-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-turquoise-700">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-foreground/50 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/collection.jpg" alt="Colección de joyas artesanales" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-turquoise-800/90 to-turquoise-600/80" />
          </div>
          <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-20 text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">¿Lista para Brillar?</h3>
            <p className="text-lg text-turquoise-100/90 max-w-xl mx-auto mb-8">
              Encuentra la joya perfecta que hable de ti. Contáctanos hoy y recibe asesoría personalizada para tu pieza ideal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Quisiera%20asesoría%20personalizada" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Phone className="w-5 h-5" /> Escribir por WhatsApp
              </a>
              <a href="https://instagram.com/maia_store81" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/25 hover:bg-white/25 transition-all duration-300">
                <Instagram className="w-5 h-5" /> Seguir en Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
