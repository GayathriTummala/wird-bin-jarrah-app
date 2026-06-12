// Pads iPad screenshots to the exact App Store "13-inch iPad" size (2048 x 2732),
// filling the extra space with the app's dark-teal background (#255458) so the
// added margins blend seamlessly with the app UI.
//
// Usage:
//   1. Drop your iPad screenshots into  ipad-screenshots/raw/
//   2. Run:  node scripts/resize-ipad-screenshots.js
//   3. Upload the results from  ipad-screenshots/out/  to the 13" iPad slot.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'ipad-screenshots', 'raw');
const OUT = path.join(__dirname, '..', 'ipad-screenshots', 'out');
const W = 2048;
const H = 2732;
const BG = { r: 0x25, g: 0x54, b: 0x58, alpha: 1 }; // #255458

fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC).filter((f) => /\.(png|jpe?g)$/i.test(f));

if (files.length === 0) {
  console.log(`No images found in ${SRC}. Drop your iPad screenshots there first.`);
  process.exit(0);
}

(async () => {
  for (const f of files) {
    const out = path.join(OUT, f.replace(/\.(jpe?g|png)$/i, '.png'));
    const meta = await sharp(path.join(SRC, f)).metadata();
    await sharp(path.join(SRC, f))
      .resize(W, H, { fit: 'contain', background: BG })
      .png()
      .toFile(out);
    console.log(`✓ ${f} (${meta.width}x${meta.height}) -> ${path.basename(out)} (${W}x${H})`);
  }
  console.log(`\nDone. ${files.length} file(s) written to ${OUT}`);
})();
