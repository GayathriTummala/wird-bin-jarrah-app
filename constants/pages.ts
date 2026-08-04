/**
 * Revamp reader content model — GENERATED for pages 2-43 from Figma manifests
 * (see scratchpad gen-pages.js); page 1 hand-traced and verified. Every visual
 * element is a vector positioned by its box in the 402×874 design frame.
 * Card area in the frame: (33, 128.8) 336×604.
 */
export type Box = { x: number; y: number; w: number; h: number };
export type PageAsset = { source: any; box: Box };

export type WirdPage = {
  id: number;
  /** Main text block (Figma "Layer_1" of the page frame) */
  content: PageAsset;
  /** All other per-page labels/blocks (titles, repeat marks, amin, extra Layer_1s) */
  extras?: PageAsset[];
  /** Centered repeat label, e.g. (ثلاثاً) */
  repeat?: PageAsset;
  /** Surah/section title, e.g. (الفاتحة) */
  title?: PageAsset;
  /** Per-page "صفحة N من 43" vector */
  pageNo: PageAsset;
};

export const TOTAL_PAGES = 43;

/** Card box in the design frame */
export const CARD = { x: 33, y: 128.8, w: 336, h: 604 };

export const wirdPages: WirdPage[] = [
  {
    id: 1,
    content: {
      source: require('@/assets/images/reader/pages/p01/content.svg'),
      box: { x: 46, y: 189.97, w: 309.19, h: 414.1 },
    },
    extras: [
      {
        source: require('@/assets/images/reader/pages/p01/amin.svg'),
        box: { x: 52.21, y: 579.27, w: 38.83, h: 20.74 },
      },
    ],
    repeat: {
      source: require('@/assets/images/reader/pages/p01/repeat.svg'),
      box: { x: 174, y: 657.36, w: 54.19, h: 28.7 },
    },
    title: {
      source: require('@/assets/images/reader/pages/p01/title.svg'),
      box: { x: 49.52, y: 661.22, w: 65.63, h: 24.63 },
    },
    pageNo: {
      source: require('@/assets/images/reader/pages/p01/pageno.svg'),
      box: { x: 154.97, y: 708.74, w: 92.26, h: 14.29 },
    },
  },
  {
    id: 2,
    content: { source: require('@/assets/images/reader/pages/p02/content.svg'), box: { x: 46, y: 178.3, w: 310.98, h: 460.18 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p02/label-1.svg'), box: { x: 49.51, y: 661.43, w: 56.54, h: 24.63 } }, // (البقرة)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p02/pageno.svg'), box: { x: 154.97, y: 708.74, w: 92.26, h: 14.29 } },
  },
  {
    id: 3,
    content: { source: require('@/assets/images/reader/pages/p03/content.svg'), box: { x: 47, y: 382.58, w: 308.8, h: 97.35 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p03/label-1.svg'), box: { x: 49.51, y: 661.43, w: 56.54, h: 24.63 } }, // (البقرة)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p03/pageno.svg'), box: { x: 154.97, y: 709.8, w: 92.26, h: 14.29 } },
  },
  {
    id: 4,
    content: { source: require('@/assets/images/reader/pages/p04/content.svg'), box: { x: 43.41, y: 197.02, w: 315.17, h: 410.56 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p04/label-1.svg'), box: { x: 49.51, y: 661.43, w: 56.54, h: 24.63 } }, // (البقرة)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p04/pageno.svg'), box: { x: 154.97, y: 708.74, w: 92.26, h: 14.29 } },
  },
  {
    id: 5,
    content: { source: require('@/assets/images/reader/pages/p05/content.svg'), box: { x: 44, y: 209.08, w: 314.63, h: 406.62 } },
    pageNo: { source: require('@/assets/images/reader/pages/p05/pageno.svg'), box: { x: 154.97, y: 708.74, w: 92.26, h: 14.29 } },
  },
  {
    id: 6,
    content: { source: require('@/assets/images/reader/pages/p06/content.svg'), box: { x: 47, y: 307.38, w: 307.85, h: 248.8 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p06/label-1.svg'), box: { x: 49.51, y: 661.43, w: 56.54, h: 24.63 } }, // (البقرة)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p06/pageno.svg'), box: { x: 154.97, y: 708.74, w: 92.26, h: 14.29 } },
  },
  {
    id: 7,
    content: { source: require('@/assets/images/reader/pages/p07/content.svg'), box: { x: 70, y: 332.08, w: 262.71, h: 200.7 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p07/label-1.svg'), box: { x: 49.51, y: 660.13, w: 92.63, h: 25.93 } }, // (آل عمران)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p07/pageno.svg'), box: { x: 154.97, y: 708.74, w: 92.26, h: 14.29 } },
  },
  {
    id: 8,
    content: { source: require('@/assets/images/reader/pages/p08/content.svg'), box: { x: 45, y: 230.12, w: 311.07, h: 404 } },
    pageNo: { source: require('@/assets/images/reader/pages/p08/pageno.svg'), box: { x: 154.97, y: 708.74, w: 92.26, h: 14.29 } },
  },
  {
    id: 9,
    content: { source: require('@/assets/images/reader/pages/p09/content.svg'), box: { x: 45, y: 357.84, w: 312.83, h: 148.42 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p09/label-1.svg'), box: { x: 49.51, y: 658.8, w: 83.3, h: 27.26 } }, // (الأعراف)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p09/pageno.svg'), box: { x: 154.97, y: 708.74, w: 92.26, h: 14.29 } },
  },
  {
    id: 10,
    content: { source: require('@/assets/images/reader/pages/p10/content.svg'), box: { x: 44, y: 383.59, w: 314.79, h: 96.85 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p10/label-1.svg'), box: { x: 49.51, y: 661.63, w: 56.98, h: 24.63 } }, // (التوبة)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p10/pageno.svg'), box: { x: 150.24, y: 708.74, w: 101.73, h: 14.29 } },
  },
  {
    id: 11,
    content: { source: require('@/assets/images/reader/pages/p11/content.svg'), box: { x: 42, y: 199.11, w: 318.97, h: 404.32 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p11/label-1.svg'), box: { x: 49.51, y: 661.43, w: 85.21, h: 24.63 } }, // (المؤمنون)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p11/pageno.svg'), box: { x: 150.87, y: 708.74, w: 100.46, h: 14.29 } },
  },
  {
    id: 12,
    content: { source: require('@/assets/images/reader/pages/p12/content.svg'), box: { x: 44, y: 284.71, w: 314.66, h: 294.91 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p12/label-1.svg'), box: { x: 49.51, y: 661.43, w: 56.08, h: 24.67 } }, // (الروم)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p12/pageno.svg'), box: { x: 150.24, y: 708.74, w: 101.73, h: 14.29 } },
  },
  {
    id: 13,
    content: { source: require('@/assets/images/reader/pages/p13/content.svg'), box: { x: 38.41, y: 145.31, w: 325.03, h: 511.84 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p13/line-1.svg'), box: { x: 286, y: 227.5, w: 60, h: 1 } }, // divider (Figma "Line 9")
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p13/pageno.svg'), box: { x: 150.24, y: 708.74, w: 101.73, h: 14.29 } },
  },
  {
    id: 14,
    content: { source: require('@/assets/images/reader/pages/p14/label-1.svg'), box: { x: 61.98, y: 303.98, w: 278.91, h: 242.16 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p14/line-1.svg'), box: { x: 51, y: 483.38, w: 300, h: 1.25 } }, // dashed divider (Figma "Line 11")
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p14/pageno.svg'), box: { x: 150.24, y: 708.74, w: 101.73, h: 14.29 } },
  },
  {
    id: 15,
    content: { source: require('@/assets/images/reader/pages/p15/content.svg'), box: { x: 56, y: 246.01, w: 289.66, h: 411.4 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p15/label-1.svg'), box: { x: 73.28, y: 147.11, w: 256.3, h: 85.43 } }, // أعوذ باللّٰه السَّميع العَليم مِن الشَّيطانِ الرَّجيم
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p15/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 16,
    content: { source: require('@/assets/images/reader/pages/p16/content.svg'), box: { x: 47, y: 161.35, w: 307.38, h: 456.4 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p16/label-1.svg'), box: { x: 49.51, y: 656.79, w: 81.76, h: 29.27 } }, // (الصَّافَّات)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p16/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 17,
    content: { source: require('@/assets/images/reader/pages/p17/content.svg'), box: { x: 70, y: 331.07, w: 262.73, h: 200.87 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p17/label-1.svg'), box: { x: 49.51, y: 661.43, w: 76.27, h: 24.63 } }, // (الرحمـٰن)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p17/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 18,
    content: { source: require('@/assets/images/reader/pages/p18/content.svg'), box: { x: 44, y: 203.33, w: 314.76, h: 458.04 } },
    pageNo: { source: require('@/assets/images/reader/pages/p18/pageno.svg'), box: { x: 150.24, y: 708.74, w: 101.73, h: 14.29 } },
  },
  {
    id: 19,
    content: { source: require('@/assets/images/reader/pages/p19/content.svg'), box: { x: 42, y: 323.12, w: 317.77, h: 197.9 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p19/label-1.svg'), box: { x: 49.51, y: 661.43, w: 63.35, h: 24.63 } }, // (الحشر)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p19/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 20,
    content: { source: require('@/assets/images/reader/pages/p20/content.svg'), box: { x: 41, y: 323.11, w: 320.45, h: 198.2 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p20/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
      { source: require('@/assets/images/reader/pages/p20/label-2.svg'), box: { x: 49.51, y: 662.29, w: 88.75, h: 23.77 } }, // (الإخلاص)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p20/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 21,
    content: { source: require('@/assets/images/reader/pages/p21/content.svg'), box: { x: 46, y: 295.31, w: 310.22, h: 253.59 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p21/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
      { source: require('@/assets/images/reader/pages/p21/label-2.svg'), box: { x: 49.51, y: 661.43, w: 50.88, h: 24.63 } }, // (الفلق)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p21/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 22,
    content: { source: require('@/assets/images/reader/pages/p22/content.svg'), box: { x: 49, y: 270.6, w: 303.49, h: 302.05 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p22/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
      { source: require('@/assets/images/reader/pages/p22/label-2.svg'), box: { x: 49.51, y: 661.43, w: 56.96, h: 24.63 } }, // (الناس)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p22/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 23,
    content: { source: require('@/assets/images/reader/pages/p23/label-1.svg'), box: { x: 89.41, y: 361.72, w: 222.83, h: 128.73 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p23/label-2.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p23/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 24,
    content: { source: require('@/assets/images/reader/pages/p24/label-1.svg'), box: { x: 48.83, y: 338.72, w: 306.16, h: 181.65 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p24/label-2.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p24/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 25,
    content: { source: require('@/assets/images/reader/pages/p25/label-1.svg'), box: { x: 80.91, y: 249.72, w: 240.36, h: 286.99 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p25/label-2.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p25/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 26,
    content: { source: require('@/assets/images/reader/pages/p26/content.svg'), box: { x: 78.63, y: 399.72, w: 244.73, h: 81.9 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p26/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p26/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 27,
    content: { source: require('@/assets/images/reader/pages/p27/content.svg'), box: { x: 84.21, y: 380.72, w: 235.3, h: 131.11 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p27/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p27/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 28,
    content: { source: require('@/assets/images/reader/pages/p28/content.svg'), box: { x: 46.95, y: 224, w: 310.38, h: 365.62 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p28/label-1.svg'), box: { x: 174.71, y: 657.56, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p28/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 29,
    content: { source: require('@/assets/images/reader/pages/p29/content.svg'), box: { x: 88.64, y: 325.72, w: 223.81, h: 204.9 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p29/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p29/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 30,
    content: { source: require('@/assets/images/reader/pages/p30/content.svg'), box: { x: 49.89, y: 309.75, w: 300.75, h: 245.7 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p30/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p30/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 31,
    content: { source: require('@/assets/images/reader/pages/p31/content.svg'), box: { x: 41.88, y: 223.8, w: 318.08, h: 369.57 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p31/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p31/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 32,
    content: { source: require('@/assets/images/reader/pages/p32/content.svg'), box: { x: 42.82, y: 170.75, w: 318.19, h: 448.62 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p32/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p32/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 33,
    content: { source: require('@/assets/images/reader/pages/p33/content.svg'), box: { x: 41.36, y: 137, w: 320.25, h: 506.84 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p33/label-1.svg'), box: { x: 174.71, y: 657.56, w: 54.19, h: 28.7 } }, // (ثلاثاً)
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p33/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 34,
    content: { source: require('@/assets/images/reader/pages/p34/content.svg'), box: { x: 46.53, y: 153.85, w: 309.44, h: 517.99 } },
    pageNo: { source: require('@/assets/images/reader/pages/p34/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 35,
    content: { source: require('@/assets/images/reader/pages/p35/content.svg'), box: { x: 46.12, y: 158.8, w: 309.32, h: 506.57 } },
    pageNo: { source: require('@/assets/images/reader/pages/p35/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 36,
    content: { source: require('@/assets/images/reader/pages/p36/content.svg'), box: { x: 39.39, y: 151, w: 324.08, h: 520.37 } },
    pageNo: { source: require('@/assets/images/reader/pages/p36/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 37,
    content: { source: require('@/assets/images/reader/pages/p37/content.svg'), box: { x: 52.49, y: 156, w: 298.09, h: 520.37 } },
    pageNo: { source: require('@/assets/images/reader/pages/p37/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 38,
    content: { source: require('@/assets/images/reader/pages/p38/content.svg'), box: { x: 42.21, y: 188.8, w: 315.71, h: 452.57 } },
    pageNo: { source: require('@/assets/images/reader/pages/p38/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 39,
    content: { source: require('@/assets/images/reader/pages/p39/content.svg'), box: { x: 46.25, y: 167.8, w: 312.72, h: 487.59 } },
    pageNo: { source: require('@/assets/images/reader/pages/p39/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 40,
    content: { source: require('@/assets/images/reader/pages/p40/content.svg'), box: { x: 53.28, y: 166.85, w: 297.75, h: 497.99 } },
    pageNo: { source: require('@/assets/images/reader/pages/p40/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 41,
    content: { source: require('@/assets/images/reader/pages/p41/content.svg'), box: { x: 49.5, y: 256.75, w: 305.04, h: 327.7 } },
    pageNo: { source: require('@/assets/images/reader/pages/p41/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 42,
    content: { source: require('@/assets/images/reader/pages/p42/content.svg'), box: { x: 50, y: 151.85, w: 300.24, h: 469.66 } },
    extras: [
      { source: require('@/assets/images/reader/pages/p42/label-1.svg'), box: { x: 174.71, y: 657.36, w: 54.19, h: 28.7 } }, // (ثلاثاً)
      { source: require('@/assets/images/reader/pages/p42/line-1.svg'), box: { x: 74, y: 186.8, w: 168, h: 1 } }, // divider (Figma "Line 9")
      { source: require('@/assets/images/reader/pages/p42/line-2.svg'), box: { x: 50, y: 522.55, w: 300, h: 2 } }, // dashed divider (Figma "Line 10")
    ],
    pageNo: { source: require('@/assets/images/reader/pages/p42/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
  {
    id: 43,
    content: { source: require('@/assets/images/reader/pages/p43/content.svg'), box: { x: 46.67, y: 155.75, w: 308.91, h: 499.87 } },
    pageNo: { source: require('@/assets/images/reader/pages/p43/pageno.svg'), box: { x: 150.24, y: 708.54, w: 101.73, h: 14.29 } },
  },
];
