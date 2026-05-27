'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/maia/Navigation';
import HeroSection from '@/components/maia/HeroSection';
import AboutSection from '@/components/maia/AboutSection';
import ProductGallery from '@/components/maia/ProductGallery';
import PaymentSection from '@/components/maia/PaymentSection';
import ContactSection from '@/components/maia/ContactSection';
import Footer from '@/components/maia/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Global GSAP scroll-based animations
    const ctx = gsap.context(() => {
      // Smooth section reveals
      gsap.utils.toArray<HTMLElement>('section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.8 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProductGallery />
        <PaymentSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
