import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const srcDir = path.join(process.cwd(), "public", "cars");
const outDir = path.join(srcDir, "optimized");
fs.mkdirSync(outDir, { recursive: true });

const images = [
  ["patrol", "hf_20260423_083635_a181ade0-2d4c-4425-8b66-8c6b8cb9ea68.png"],
  ["sentra-main", "sentra-1.png"],
  ["sentra-hero", "sentra-2.png"],
  ["qashqai", "qashqai-new.png"],
  ["xtrail", "xtrail-new.png"],
  ["mob-1", "mob-landing-1.png"],
  ["mob-2", "mob-landing-2.png"],
  ["mob-3", "mob-landing-3.png"],
  ["salon", "salon.png"],
];

const widths = [480, 768, 1024, 1440];

for (const [name, file] of images) {
  const input = path.join(srcDir, file);
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
