import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Zoom multipliers applied on top of the auto-fitted size. 1.0 = the fitted
// maximum (which is itself capped at 22.5px by FitToCard); lower values let the
// user make the text smaller. Never above 1.0 so the page can't overflow.
const LEVELS = [0.75, 0.85, 0.95, 1.0];
const DEFAULT_INDEX = 3; // 1.0 — fitted maximum
const STORE_KEY = 'readerFontScale';

type FontScaleContextValue = {
  scale: number;
  increase: () => void;
  decrease: () => void;
  canIncrease: boolean;
  canDecrease: boolean;
};

const FontScaleContext = createContext<FontScaleContextValue | null>(null);

export function FontScaleProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(DEFAULT_INDEX);

  useEffect(() => {
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(STORE_KEY);
        if (saved != null) {
          const i = parseInt(saved, 10);
          if (!Number.isNaN(i) && i >= 0 && i < LEVELS.length) setIndex(i);
        }
      } catch {
        // ignore — fall back to default
      }
    })();
  }, []);

  const persist = (i: number) => {
    SecureStore.setItemAsync(STORE_KEY, String(i)).catch(() => {});
  };

  const increase = () =>
    setIndex((i) => {
      const next = Math.min(i + 1, LEVELS.length - 1);
      if (next !== i) persist(next);
      return next;
    });

  const decrease = () =>
    setIndex((i) => {
      const next = Math.max(i - 1, 0);
      if (next !== i) persist(next);
      return next;
    });

  return (
    <FontScaleContext.Provider
      value={{
        scale: LEVELS[index],
        increase,
        decrease,
        canIncrease: index < LEVELS.length - 1,
        canDecrease: index > 0,
      }}
    >
      {children}
    </FontScaleContext.Provider>
  );
}

// Safe default if used outside a provider (so ScaledText never crashes).
export function useFontScale(): FontScaleContextValue {
  const ctx = useContext(FontScaleContext);
  if (!ctx) {
    return { scale: 1, increase: () => {}, decrease: () => {}, canIncrease: false, canDecrease: false };
  }
  return ctx;
}
