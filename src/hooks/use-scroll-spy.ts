'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from '@/lib/router';

/**
 * useScrollSpy — observes sections and updates the URL via replaceState
 * as the user scrolls. Uses requestAnimationFrame for performance.
 *
 * - `sectionIds`: ordered array of section element IDs on the current page.
 *   The first ID is the "default" section — when it's active the URL has
 *   no `?section=` query (cleaner shareable links).
 *
 * - Trigger line: 15 % from the top of the viewport. The section whose top
 *   edge is closest to that line wins.
 */

export function useScrollSpy(sectionIds: string[]) {
  const { route, setActiveSection } = useRouter();
  const currentRef = useRef<string>('');
  const rafRef = useRef<number | null>(null);
  const scrollInitDone = useRef(false);

  // ─── Scroll to section when the URL contains ?section= on load / navigation ───
  useEffect(() => {
    if (route.section && !scrollInitDone.current) {
      scrollInitDone.current = true;

      const timer = setTimeout(() => {
        const el = document.getElementById(route.section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 450); // wait for AnimatePresence page transition (0.35s)

      return () => clearTimeout(timer);
    }

    // Reset flag when the page changes so future same-page navigations work
    scrollInitDone.current = false;
  }, [route.page, route.section]);

  // ─── Scroll spy: detect which section is in the trigger zone ──────────────
  useEffect(() => {
    if (sectionIds.length === 0) return;

    const firstSection = sectionIds[0];

    const detect = () => {
      const triggerY = window.innerHeight * 0.15; // 15% from viewport top
      let bestId = firstSection;
      let bestDist = Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - triggerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }

      if (bestId !== currentRef.current) {
        currentRef.current = bestId;
        // First (default) section → empty section (clean URL)
        setActiveSection(bestId === firstSection ? '' : bestId);
      }
    };

    // Initial detection after a short delay (DOM may be animating)
    const initTimer = setTimeout(detect, 200);

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        detect();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(','), route.page, setActiveSection]);
}
