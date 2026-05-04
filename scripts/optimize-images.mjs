import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const srcDir = path.join(process.cwd(), "public", "cars");
const outDir = path.join(srcDir, "optimized");
fs.mkdirSync(outDir, { recursive: true });

const galleryPatrol = Array.from({ length: 9 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return [`gallery-patrol-${n}`, `gallery-patrol-${n}.png`];
});
const galleryQashqai = Array.from({ length: 9 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return [`gallery-qashqai-${n}`, `gallery-qashqai-${n}.png`];
});

const images = [
  ["patrol", "hero-landing-patrol.png"],
  ["slider-patrol", "slider-patrol.png"],
  ["qashqai", "hero-landing-qashqai.png"],
  ["hero-qashqai", "hero-landing-qashqai.png"],
  ["mob-1", "mob-landing-1.png"],
  ["mob-2", "mob-landing-2.png"],
  ["mob-3", "mob-landing-3.png"],
  ["salon", "salon.png"],
  ...galleryPatrol,
  ...galleryQashqai,
];

const widths = [480, 768, 1024, 1440];

for (const [name, file] of images) {
  const input = path.join(srcDir, file);
  if (!fs.existsSync(input)) {
    console.warn(`skip missing: ${file}`);
    continue;
  }
  for (const width of widths) {
    const resized = sharp(input).resize({ width, withoutEnlargement: true });
    await resized
      .clone()
      .avif({ quality: 52, effort: 4 })
      .toFile(path.join(outDir, `${name}-${width}.avif`));
    await resized
      .clone()
      .webp({ quality: 68, effort: 4 })
      .toFile(path.join(outDir, `${name}-${width}.webp`));
  }
}

console.log("optimized images generated");
