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
} from 'lucide-react';

const paymentMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Directo',
    description:
      'Haz tu pedido directamente por WhatsApp y recibe atención personalizada. Te enviamos fotos, precios y confirmación al instante.',
    cta: 'Chatear Ahora',
    href: 'https://wa.me/51977333858?text=Hola%20Maia%20Store!%20Quisiera%20hacer%20un%20pedido',
    color: 'bg-green-50 text-green-600 hover:bg-green-100 border-green-100 hover:border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    icon: CreditCard,
    title: 'Tarjeta de Crédito/Débito',
    description:
      'Paga de forma segura con tu tarjeta Visa, Mastercard o American Express a través de nuestra pasarela de pagos en línea certificada.',
    cta: 'Pagar en Línea',
    href: '#',
    color: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100 hover:border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    icon: QrCode,
    title: 'Yape / Plin',
    description:
      'Transferencias instantáneas a través de Yape o Plin. Solo escanea el código QR o realiza la transferencia directamente.',
    cta: 'Escanear QR',
    href: '#',
    color: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-100 hover:border-purple-200',
    iconBg: 'bg-purple-100',
  },
  {
    icon: Building2,
    title: 'Transferencia Bancaria',
    description:
      'Realiza tu pago por transferencia bancaria a nuestras cuentas en BCP, Interbank o Banco de la Nación. Envíanos el comprobante por WhatsApp.',
    cta: 'Ver Cuentas',
    href: 'https://wa.me/51977333858?text=Hola!%20Necesito%20los%20datos%20para%20transferencia%20bancaria',
    color: 'bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-100 hover:border-amber-200',
    iconBg: 'bg-amber-100',
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Pago Seguro',
    description: 'Todas las transacciones están protegidas y verificadas.',
  },
  {
    icon: Truck,
    title: 'Envío a Todo el Perú',
    description: 'Envíos rápidos y seguros a cualquier punto del país.',
  },
];

export default function PaymentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="pagos" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]" />

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-semibold tracking-widest uppercase text-turquoise-200 mb-4"
          >
            Métodos de Pago
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Compra Fácil y{' '}
            <span className="text-turquoise-200">Seguro</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-turquoise-100/80 max-w-2xl mx-auto"
          >
            Elige el método de pago que más te convenga. Todos nuestros procesos son
            seguros, rápidos y confiables.
          </motion.p>
          <div className="section-divider mx-auto mt-6 bg-turquoise-300/50" />
        </div>

        {/* Payment Methods Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {paymentMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group relative p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer`}
            >
              <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center mb-4 group-hover:bg-white/25 transition-colors duration-300">
                <method.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
              <p className="text-sm text-turquoise-100/70 leading-relaxed mb-4">
                {method.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-turquoise-200 group-hover:text-white transition-colors">
                {method.cta}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>

        {/* Guarantees */}
        <div className="grid sm:grid-cols-2 gap-6">
          {guarantees.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-turquoise-200" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-turquoise-100/60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
