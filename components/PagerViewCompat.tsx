/**
 * Base file for TypeScript resolution only.
 * At runtime, Metro replaces this with:
 *   - PagerViewCompat.native.tsx  (iOS / Android)
 *   - PagerViewCompat.web.tsx     (Expo Web)
 */
export { default } from 'react-native-pager-view';
