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
 */
export const BASE_W = 402;
export const BASE_H = 874;

export function useLayoutScale() {
  const { width, height } = useWindowDimensions();
  const s = Math.min(width / BASE_W, height / BASE_H);
  const colX = (width - BASE_W * s) / 2;
  return { s, colX, width, height };
}
