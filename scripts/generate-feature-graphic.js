// Generates 1024x500 Google Play feature graphics from the app icon.
// Variant A: cream background + teal title + teal double border.
// Variant B: teal background + cream title + cream double border (matches app landing).
const sharp = require('sharp');
const path = require('path');

const W = 1024, H = 500;
const CREAM = '#FFFBF1';
const TEAL = '#255458';
const IMAGES = path.join(__dirname, '..', 'assets', 'images');

(async () => {
  // Tight title crop from the icon (teal text on cream).
  const title = await sharp(path.join(IMAGES, 'icon.png'))
    .trim({ background: CREAM, threshold: 10 })
    .toBuffer({ resolveWithObject: true });

  const targetH = 230;
  const scale = targetH / title.info.height;
  const targetW = Math.round(title.info.width * scale);
  const titleResized = await sharp(title.data).resize(targetW, targetH).toBuffer();

  // ---- Variant A: cream background ----
  const frameCream = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="${CREAM}"/>
      <rect x="20" y="20" width="${W - 40}" height="${H - 40}" fill="none" stroke="${TEAL}" stroke-width="4"/>
      <rect x="33" y="33" width="${W - 66}" height="${H - 66}" fill="none" stroke="${TEAL}" stroke-width="1.5"/>
    </svg>`
  );
  await sharp(frameCream)
    .composite([{ input: titleResized, gravity: 'center' }])
    .png()
    .toFile(path.join(IMAGES, 'feature-graphic-cream.png'));

  // ---- Variant B: teal background, recolor the title to cream ----
  // Build an alpha mask: teal text -> opaque, cream bg -> transparent.
  const alpha = await sharp(titleResized)
    .flatten({ background: CREAM })
    .greyscale()
    .negate()
    .normalise()
    .linear(1.4, -25)         // crisp the text edges, drop the background haze
    .toColourspace('b-w')
    .toBuffer();
  const creamTitle = await sharp({
    create: { width: targetW, height: targetH, channels: 3, background: CREAM },
  }).joinChannel(alpha).png().toBuffer();

  const frameTeal = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="${TEAL}"/>
      <rect x="20" y="20" width="${W - 40}" height="${H - 40}" fill="none" stroke="${CREAM}" stroke-width="4"/>
      <rect x="33" y="33" width="${W - 66}" height="${H - 66}" fill="none" stroke="${CREAM}" stroke-width="1.5"/>
    </svg>`
  );
  await sharp(frameTeal)
    .composite([{ input: creamTitle, gravity: 'center' }])
    .png()
    .toFile(path.join(IMAGES, 'feature-graphic-teal.png'));

  console.log('Wrote feature-graphic-cream.png and feature-graphic-teal.png');
})().catch((e) => { console.error(e); process.exit(1); });
