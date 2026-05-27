'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Phone, ChevronRight, MapPin } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { testimonials } from '@/lib/store-data';
import InfiniteMarquee from '@/components/maia/InfiniteMarquee';

export default function ContactoPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { navigate } = useRouter();

  return (
    <div ref={sectionRef} className="relative pt-20 pb-32 sm:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Page Header */}
        <div className="text-center mb-10 pt-4">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-600 mb-3 block">
            Contactanos
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }} className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Estamos Aqui <span className="text-gradient-turquoise">Para Ti</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="text-sm text-foreground/40 max-w-lg mx-auto">
            Tienes alguna pregunta o necesitas asesoria personalizada? No dudes en escribirnos.
          </motion.p>
          <div className="section-divider mx-auto mt-5" />
        </div>

        {/* Breadcrumb */}
        <motion.nav initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.3 }} className="flex items-center justify-center gap-1.5 text-xs text-foreground/40 mb-10">
          <button onClick={() => navigate('#/')} className="hover:text-primary transition-colors">Inicio</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/60 font-medium">Contacto</span>
        </motion.nav>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-16 sm:mb-20">
          {[
            { icon: Phone, title: 'WhatsApp', detail: '+51 977 333 858', desc: 'Respuesta inmediata. Lunes a Sabado de 9am a 8pm.', href: 'https://wa.me/51977333858?text=Hola%20Maia%20Store!', color: 'bg-green-50 border-green-100' },
            { icon: Instagram, title: 'Instagram', detail: '@maia_store81', desc: 'Siguenos para nuevas colecciones y ofertas exclusivas.', href: 'https://instagram.com/maia_store81', color: 'bg-pink-50 border-pink-100' },
            { icon: MapPin, title: 'Ubicacion', detail: 'Peru', desc: 'Envios a todo el pais a traves de Olva Courier y Shalom Express.', href: '#', color: 'bg-turquoise-50 border-turquoise-100' },
          ].map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -3 }}
              className={`p-5 lg:p-6 rounded-2xl border ${card.color} transition-all duration-500 hover:shadow-xl group`}
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-0.5">{card.title}</h3>
              <p className="text-sm font-semibold text-primary mb-1">{card.detail}</p>
              <p className="text-xs text-foreground/50">{card.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Testimonials — Infinite Marquee */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              Lo que Dicen <span className="text-gradient-turquoise">Nuestras Clientas</span>
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <InfiniteMarquee speed={38} className="mb-5">
            {testimonials.slice(0, 6).map((t, i) => (
              <div key={`c-${i}`} className="flex-shrink-0 w-[320px] sm:w-[360px] p-5 rounded-2xl bg-zinc-50/60 border border-zinc-100/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                  ))}
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed mb-3 line-clamp-3">{t.text}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-zinc-100">
                  <div className="w-8 h-8 rounded-full bg-turquoise-100 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-turquoise-700">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-foreground/40 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteMarquee>
        </div>

        {/* CTA Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/collection.jpg" alt="Coleccion de joyas artesanales" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-turquoise-900/90 to-turquoise-700/80" />
          </div>
          <div className="relative z-10 px-6 sm:px-12 py-14 sm:py-16 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Lista para Brillar?</h3>
            <p className="text-sm text-turquoise-100/90 max-w-md mx-auto mb-6">
              Encuentra la joya perfecta que hable de ti. Contactanos hoy y recibe asesoria personalizada.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/51977333858?text=Hola%20Maia%20Store!" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Phone className="w-4 h-4" /> Escribir por WhatsApp
              </a>
              <a href="https://instagram.com/maia_store81" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold border border-white/25 hover:bg-white/25 transition-all duration-300">
                <Instagram className="w-4 h-4" /> Seguir en Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
