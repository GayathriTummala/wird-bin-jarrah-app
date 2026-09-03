import { useWindowDimensions } from 'react-native';

/**
 * Design-baseline scaling for the revamp.
 *
 * The Figma designs are drawn on a 402×874 frame (iPhone 16 Pro). Every
 * element is positioned/sized in those baseline units and multiplied by a
 * single uniform factor `s`, so proportions are identical on every device
 * regardless of screen size or the OS font-size setting.
 *
 * `colX` centers the 402-unit design column horizontally on screens wider
 * than the scaled column (tablets).
 *
 * `reservedBottom` is screen space (in dp) that the design must not use —
 * e.g. an opaque Android 3-button navigation bar. It is subtracted from the
 * height before computing `s`, so a screen whose scale is height-limited
 * still fits the entire 874-unit frame above that reserved strip.
 */
export const BASE_W = 402;
export const BASE_H = 874;

export function useLayoutScale(reservedBottom = 0) {
  const { width, height } = useWindowDimensions();
  const usableH = Math.max(height - reservedBottom, 1);
  const s = Math.min(width / BASE_W, usableH / BASE_H);
  const colX = (width - BASE_W * s) / 2;
  return { s, colX, width, height };
}
