'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Product } from '@/lib/store-data';

// ─── Types ────────────────────────────────────────────────────

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextValue {
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  updateQuantity: (productId: number, quantity: number) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: number | string) => void;
  isFavorite: (productId: number | string) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

// ─── Safe localStorage helpers ───────────────────────────────

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

// ─── Provider ─────────────────────────────────────────────────

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setCart(loadFromStorage<CartItem[]>('maia_cart', []));
    setFavorites(loadFromStorage<string[]>('maia_favorites', []));
    setHydrated(true);
  }, []);

  // Persist cart changes
  useEffect(() => {
    if (hydrated) saveToStorage('maia_cart', cart);
  }, [cart, hydrated]);

  // Persist favorites changes
  useEffect(() => {
    if (hydrated) saveToStorage('maia_favorites', favorites);
  }, [favorites, hydrated]);

  // ─── Cart Logic ──────────────────────────────────────────
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback(
    (productId: number) => cart.some((item) => item.product.id === productId),
    [cart]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ─── Favorites Logic ────────────────────────────────────
  const toggleFavorite = useCallback((productId: number | string) => {
    const id = String(productId);
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (productId: number | string) => favorites.includes(String(productId)),
    [favorites]
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        updateQuantity,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
