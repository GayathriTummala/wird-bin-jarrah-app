/**
 * Device font-growth is disabled: page sizing is now handled by <FitToCard>,
 * which scales each whole page uniformly to fit the cream card. This hook is
 * kept (returning 1) so the width caps (`cw`) in ReaderPage keep working
 * without growing the base design.
 */
export function useDeviceScale(): number {
  return 1;
}
