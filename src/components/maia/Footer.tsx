'use client';

import { Instagram, Music, Phone, MapPin } from 'lucide-react';
import { useRouter } from '@/lib/router';

export default function Footer() {
  const { navigate } = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-turquoise-900 text-white overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141,197.93,133.11,257.11,126,304.39,70.84,321.39,56.44Z" fill="currentColor" className="text-background" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={() => navigate('#/')} className="mb-4 block">
              <span className="text-2xl font-extrabold text-white">MAIA</span>
              <span className="text-2xl font-extralight tracking-widest text-turquoise-300 ml-1">STORE</span>
            </button>
            <p className="text-turquoise-200/70 text-sm leading-relaxed mb-6">
              Joyas tejidas a mano con amor y dedicación en Perú. Cada pieza es única, artesanal y está hecha para resaltar tu belleza natural.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/maia_store81" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:text-pink-300 transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@maia_store81" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-slate-400/20 hover:text-slate-300 transition-all duration-300" aria-label="TikTok">
                <Music className="w-5 h-5" />
              </a>
              <a href="https://wa.me/51977333858" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-green-500/20 hover:text-green-300 transition-all duration-300" aria-label="WhatsApp">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tienda Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-turquoise-300 mb-4">Tienda</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Pulseras', href: '#/coleccion/categoria/pulseras' },
                { label: 'Collares', href: '#/coleccion/categoria/collares' },
                { label: 'Aretes', href: '#/coleccion/categoria/aretes' },
                { label: 'Anillos', href: '#/coleccion/categoria/anillos' },
                { label: 'Ver Todo', href: '#/coleccion' },
              ].map((link) => (
                <li key={link.label}>
                  <button onClick={() => navigate(link.href)} className="text-sm text-turquoise-200/70 hover:text-white transition-colors duration-300">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-turquoise-300 mb-4">Información</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Nosotros', href: '#/nosotros' },
                { label: 'Cómo Comprar', href: '#/comprar' },
                { label: 'Métodos de Pago', href: '#/comprar' },
                { label: 'Contacto', href: '#/contacto' },
              ].map((link) => (
                <li key={link.label}>
                  <button onClick={() => navigate(link.href)} className="text-sm text-turquoise-200/70 hover:text-white transition-colors duration-300">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-turquoise-300 mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/51977333858" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-turquoise-200/70 hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4 flex-shrink-0" /> +51 977 333 858
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-turquoise-200/70">
                <MapPin className="w-4 h-4 flex-shrink-0" /> Perú
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-turquoise-200/50 text-center sm:text-left">
              &copy; {currentYear} Maia Store. Todos los derechos reservados.
            </p>
            <a
              href="https://fastpagepro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-turquoise-200/50 hover:text-turquoise-200 transition-colors duration-300 text-center sm:text-right"
            >
              Diseño y desarrollo por{' '}
              <span className="font-semibold text-turquoise-300 hover:text-turquoise-100 transition-colors">
                fastpagepro.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
