'use client';

import type { ReactNode } from 'react';
import { StoreProvider } from '@/lib/store-context';
import { ToastProvider } from '@/lib/toast-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </StoreProvider>
  );
}
