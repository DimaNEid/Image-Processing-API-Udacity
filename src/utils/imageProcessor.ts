import path from 'path';
import sharp from 'sharp';
import { ensureDir, fileExists, buildThumbName } from './fs';

export type ProcessParams = {
  filename: string; // without extension
  width: number;
  height: number;
  fullDir: string;
  thumbDir: string;
};

/**
 * Resizes JPG from assets/full/<filename>.jpg and caches to assets/thumb/<filename>_<w>x<h>.jpg
 * Returns absolute output path.
 */
export const processImage = async (p: ProcessParams): Promise<string> => {
  const src = path.resolve(p.fullDir, `${p.filename}.jpg`);
  const outName = buildThumbName(p.filename, p.width, p.height);
  const out = path.resolve(p.thumbDir, outName);

  await ensureDir(p.thumbDir);

  // return cached if exists
  if (await fileExists(out)) return out;

  // ensure source exists
  if (!(await fileExists(src))) {
    throw new Error(`Input file is missing: ${src}`);
  }

  await sharp(src).resize(p.width, p.height).jpeg({ mozjpeg: true }).toFile(out);

  return out;
};
