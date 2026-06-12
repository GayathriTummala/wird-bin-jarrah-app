import { useFontScale } from '@/contexts/FontScaleContext';
import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

// Reader text base size is now 22.5px, so the upper cap is 1.0 — the page is
// only ever shrunk to fit (never grown beyond its 22.5px design size).
const MAX_SCALE = 1.0;
// Breathing room (top/bottom/sides) between the content and the card edges.
const PAD = 14;

/**
 * Scales its children uniformly so the whole page fits inside the cream card
 * — like a Figma fixed-page. Long pages shrink to fit (no scroll); short pages
 * grow up to the 22.5px cap. Line breaks (words-per-line) never change because
 * the entire laid-out block is scaled as one. The user zoom (<= 1.0) further
 * reduces from the fitted size.
 */
export default function FitToCard({ children, disabled = false, maxScale = MAX_SCALE, pad = PAD, offsetTop = 0 }: { children: React.ReactNode; disabled?: boolean; maxScale?: number; pad?: number; offsetTop?: number }) {
  const { scale: userZoom } = useFontScale();
  const [avail, setAvail] = useState({ w: 0, h: 0 });
  const [nat, setNat] = useState({ w: 0, h: 0 });

  // Image pages (fixed graphics) opt out of auto-fit — render at native size,
  // centered, exactly as before.
  if (disabled) {
    return (
      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
    );
  }

  const onAvail = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setAvail((p) => (Math.abs(p.w - width) < 0.5 && Math.abs(p.h - height) < 0.5 ? p : { w: width, h: height }));
  };
  const onNat = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setNat((p) => (Math.abs(p.w - width) < 0.5 && Math.abs(p.h - height) < 0.5 ? p : { w: width, h: height }));
  };

  let fit = 1;
  if (avail.w > 0 && avail.h > 0 && nat.w > 0 && nat.h > 0) {
    fit = Math.min((avail.w - pad * 2) / nat.w, (avail.h - pad * 2 - offsetTop) / nat.h, maxScale);
    if (fit <= 0) fit = maxScale;
  }
  const scale = fit * userZoom;

  return (
    <View
      style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: offsetTop }}
      onLayout={onAvail}
    >
      <View style={{ transform: [{ scale }] }}>
        {/* Measured at base size (transform does not affect layout metrics). */}
        <View style={{ alignItems: 'center' }} onLayout={onNat}>
          {children}
        </View>
      </View>
    </View>
  );
}
