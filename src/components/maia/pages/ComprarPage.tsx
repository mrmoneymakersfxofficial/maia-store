'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageCircle,
  CreditCard,
  QrCode,
  Building2,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from '@/lib/router';
import { paymentMethods } from '@/lib/store-data';

const iconMap: Record<string, React.ElementType> = {
  'whatsapp': MessageCircle,
  'tarjeta': CreditCard,
  'yape-plin': QrCode,
  'transferencia': Building2,
};

export default function ComprarPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { navigate } = useRouter();

  return (
    <div ref={sectionRef} className="relative pt-20 pb-32 sm:pb-24">
      {/* Hero */}
      <div className="bg-primary py-12 sm:py-16 px-4 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-200 mb-3 block">
            Métodos de Pago
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }} className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Cómo <span className="text-turquoise-200">Comprar</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="text-sm text-turquoise-100/80 max-w-lg mx-auto">
            Elige el método de pago que más te convenga. Todos nuestros procesos son seguros, rápidos y confiables.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.3 }} className="flex items-center gap-1.5 text-xs text-foreground/40 mb-8">
          <button onClick={() => navigate('#/')} className="hover:text-primary transition-colors">Inicio</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/60 font-medium">Cómo Comprar</span>
        </motion.nav>

        {/* Payment Methods */}
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {paymentMethods.map((method, index) => {
            const Icon = iconMap[method.id] || MessageCircle;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                className="group p-6 rounded-2xl bg-white/60 border border-zinc-100/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500"
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-turquoise-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1">{method.title}</h3>
                    <p className="text-xs text-foreground/50 leading-relaxed">{method.description}</p>
                  </div>
                </div>
                <div className="space-y-2.5 mb-5">
                  {method.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-turquoise-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                      </div>
                      <p className="text-xs text-foreground/60 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 bg-primary hover:bg-turquoise-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-turquoise-500/15"
                >
                  {method.cta}
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantees */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {[
            { icon: ShieldCheck, title: 'Pago 100% Seguro', desc: 'Todas las transacciones están protegidas con encriptación SSL de 256 bits y verificación en tiempo real.' },
            { icon: Truck, title: 'Envío a Todo el Perú', desc: 'Realizamos envíos a través de Olva Courier y Shalom Express a todas las ciudades del país.' },
            { icon: CheckCircle2, title: 'Satisfacción Garantizada', desc: 'Si tu joya llega con algún defecto de fabricación, la reparamos o reemplazamos sin costo adicional.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-3 p-5 rounded-2xl bg-turquoise-50/50 border border-turquoise-100/50"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-foreground/50 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Preguntas Frecuentes</h2>
          <div className="section-divider mx-auto" />
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {[
            { q: '¿Cuánto tiempo tarda el envío?', a: 'Los envíos a Lima metropolitan toman de 1 a 2 días hábiles. A provincias, de 3 a 5 días hábiles. Te enviaremos el número de rastreo para que puedas seguir tu pedido en todo momento.' },
            { q: '¿Puedo personalizar una joya?', a: '¡Por supuesto! Ofrecemos servicio de personalización. Escríbenos por WhatsApp con tu idea y te enviaremos una propuesta con diseño y precio. Las personalizaciones pueden tomar de 5 a 7 días adicionales.' },
            { q: '¿Qué pasa si no me queda bien?', a: 'Ofrecemos cambios sin costo dentro de los primeros 7 días posteriores a la recepción. La joya debe estar en su estado original. Los costos de envío del cambio corren por nuestra cuenta.' },
            { q: '¿Las joyas vienen con garantía?', a: 'Sí, todas nuestras joyas tienen garantía de 6 meses contra defectos de fabricación. Esto incluye el tejido, los acabados metálicos y las uniones. El uso indebido o desgaste natural no están cubiertos.' },
          ].map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="group bg-white/50 border border-zinc-100/60 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-foreground hover:text-primary transition-colors">
                {faq.q}
                <ChevronRight className="w-4 h-4 text-turquoise-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-xs text-foreground/50 leading-relaxed">{faq.a}</div>
            </motion.details>
          ))}
        </div>
      </div>
    </div>
  );
}
