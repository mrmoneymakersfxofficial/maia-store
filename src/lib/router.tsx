'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';

// ─── Route Types ─────────────────────────────────────────────

export interface RouteInfo {
  page: string;
  params: Record<string, string>;
  hash: string;
  section: string;
}

type RouteChangeListener = (route: RouteInfo) => void;

// ─── Router Context ──────────────────────────────────────────

interface RouterContextValue {
  route: RouteInfo;
  navigate: (hash: string) => void;
  back: () => void;
  isActive: (hash: string) => boolean;
  setActiveSection: (sectionId: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

// ─── Route Parser ────────────────────────────────────────────

function parseHash(hash: string): RouteInfo {
  const clean = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!clean || clean === '/') {
    return { page: 'home', params: {}, hash: '#/', section: '' };
  }

  // Extract section deep-link from query string: #/nosotros?section=valores
  const [pathPart, queryString] = clean.split('?');
  const section = new URLSearchParams(queryString || '').get('section') || '';

  const segments = pathPart.split('/').filter(Boolean);
  const page = segments[0] || 'home';
  const params: Record<string, string> = {};

  // Parse: coleccion/pulsera-turquesa-elite → product detail
  if (segments.length === 2 && page === 'coleccion') {
    params.slug = segments[1];
  }
  // Parse: coleccion/categoria/pulseras → category filter
  if (segments.length === 3 && page === 'coleccion' && segments[1] === 'categoria') {
    params.category = segments[2];
  }

  return { page, params, hash: `#/${pathPart}`, section };
}

// ─── Safe window access helper ──────────────────────────────

function getHash(): string {
  if (typeof window !== 'undefined') {
    return window.location.hash || '#/';
  }
  return '#/';
}

// ─── Router Provider ─────────────────────────────────────────

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteInfo>({
    page: 'home',
    params: {},
    hash: '#/',
    section: '',
  });
  const [mounted, setMounted] = useState(false);
  const listenersRef = useRef<RouteChangeListener[]>([]);
  const historyRef = useRef<string[]>(['#/']);

  // Hydrate route from browser URL after mount
  useEffect(() => {
    const initialRoute = parseHash(getHash());
    setRoute(initialRoute);
    historyRef.current = [initialRoute.hash];
    setMounted(true);

    const handleHashChange = () => {
      const newRoute = parseHash(getHash());
      setRoute(newRoute);
      listenersRef.current.forEach((fn) => fn(newRoute));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback(
    (hash: string) => {
      const cleanHash = hash.startsWith('#') ? hash : `#${hash}`;
      // Strip any lingering section query from the target hash
      const clean = cleanHash.split('?')[0];
      historyRef.current.push(clean);
      window.location.hash = clean;
      // Scroll is handled per-page via useEffect to avoid hero flash
    },
    []
  );

  const back = useCallback(() => {
    historyRef.current.pop();
    const prev = historyRef.current[historyRef.current.length - 1] || '#/';
    const cleanPrev = prev.split('?')[0];
    window.location.hash = cleanPrev;
    // Scroll is handled per-page via useEffect to avoid hero flash
  }, []);

  const isActive = useCallback(
    (page: string) => {
      return route.page === page;
    },
    [route.page]
  );

  // ─── setActiveSection (replaceState — no history entry, no reload) ───
  const setActiveSection = useCallback(
    (sectionId: string) => {
      const baseHash = route.hash; // already clean (no query string)
      const basePathname = window.location.pathname;

      if (!sectionId) {
        history.replaceState(null, '', basePathname + baseHash);
      } else {
        history.replaceState(
          null,
          '',
          basePathname + baseHash + '?section=' + encodeURIComponent(sectionId)
        );
      }

      setRoute((prev) => ({ ...prev, section: sectionId }));
    },
    [route.hash]
  );

  // During SSR/pre-render, return a safe shell
  if (!mounted) {
    return (
      <RouterContext.Provider value={{ route, navigate, back, isActive, setActiveSection }}>
        {children}
      </RouterContext.Provider>
    );
  }

  return (
    <RouterContext.Provider value={{ route, navigate, back, isActive, setActiveSection }}>
      {children}
    </RouterContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within a RouterProvider');
  return ctx;
}

// ─── Link Component ─────────────────────────────────────────

export function RouterLink({
  to,
  children,
  className = '',
  onClick,
  ...props
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  return (
    <a
      href={to}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
