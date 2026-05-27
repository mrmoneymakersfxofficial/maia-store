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
    <div ref={sectionRef} className="relative pt-32 pb-24 sm:pb-32 overflow-hidden">
      {/* Hero */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-primary" />
      <div className="absolute top-0 left-0 right-0 h-96 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16 pt-8">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-200 mb-4">
            Métodos de Pago
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Cómo <span className="text-turquoise-200">Comprar</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-turquoise-100/80 max-w-2xl mx-auto">
            Elige el método de pago que más te convenga. Todos nuestros procesos son seguros, rápidos y confiables.
          </motion.p>
        </div>

        {/* Breadcrumb */}
        <motion.nav initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.25 }} className="flex items-center justify-center gap-2 text-sm text-white/50 mb-12 -mt-4">
          <button onClick={() => navigate('#/')} className="hover:text-turquoise-200 transition-colors">Inicio</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-turquoise-200 font-medium">Cómo Comprar</span>
        </motion.nav>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {paymentMethods.map((method, index) => {
            const Icon = iconMap[method.id] || MessageCircle;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-turquoise-500/5 hover:shadow-2xl hover:shadow-turquoise-500/10 transition-all duration-500"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-turquoise-50 flex items-center justify-center flex-shrink-0 group-hover:bg-turquoise-100 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{method.title}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{method.description}</p>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-3 mb-6">
                    {method.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-turquoise-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{i + 1}</span>
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-turquoise-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-turquoise-500/20"
                  >
                    {method.cta}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantees */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: ShieldCheck, title: 'Pago 100% Seguro', desc: 'Todas las transacciones están protegidas con encriptación SSL de 256 bits y verificación en tiempo real. Tus datos financieros nunca son almacenados en nuestros servidores.' },
            { icon: Truck, title: 'Envío a Todo el Perú', desc: 'Realizamos envíos a través de Olva Courier y Shalom Express a todas las ciudades del país. El tiempo de entrega promedio es de 3 a 5 días hábiles dependiendo de tu ubicación.' },
            { icon: CheckCircle2, title: 'Satisfacción Garantizada', desc: 'Si tu joya llega con algún defecto de fabricación, la reparamos o reemplazamos sin costo adicional. Tu satisfacción es nuestra prioridad absoluta y garantía de calidad.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-turquoise-50 border border-turquoise-100"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Preguntas Frecuentes</h2>
          <div className="section-divider mx-auto" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: '¿Cuánto tiempo tarda el envío?', a: 'Los envíos a Lima metropolitan toman de 1 a 2 días hábiles. A provincias, de 3 a 5 días hábiles. Te enviaremos el número de rastreo para que puedas seguir tu pedido en todo momento.' },
            { q: '¿Puedo personalizar una joya?', a: '¡Por supuesto! Ofrecemos servicio de personalización. Escríbenos por WhatsApp con tu idea y te enviaremos una propuesta con diseño y precio. Las personalizaciones pueden tomar de 5 a 7 días adicionales.' },
            { q: '¿Qué pasa si no me queda bien?', a: 'Ofrecemos cambios sin costo dentro de los primeros 7 días posteriores a la recepción. La joya debe estar en su estado original. Los costos de envío del cambio corren por nuestra cuenta.' },
            { q: '¿Las joyas vienen con garantía?', a: 'Sí, todas nuestras joyas tienen garantía de 6 meses contra defectos de fabricación. Esto incluye el tejido, los acabados metálicos y las uniones. El uso indebido o desgaste natural no están cubiertos.' },
          ].map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="group bg-white rounded-xl border border-turquoise-100/50 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer text-foreground font-semibold hover:text-primary transition-colors">
                {faq.q}
                <ChevronRight className="w-5 h-5 text-turquoise-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-sm text-foreground/60 leading-relaxed">{faq.a}</div>
            </motion.details>
          ))}
        </div>
      </div>
    </div>
  );
}
