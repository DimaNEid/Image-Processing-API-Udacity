import fs from 'fs';
import path from 'path';

export const ensureDir = async (dir: string): Promise<void> => {
  await fs.promises.mkdir(dir, { recursive: true });
};

export const fileExists = async (p: string): Promise<boolean> => {
  try {
    await fs.promises.access(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const buildThumbName = (filename: string, w: number, h: number): string =>
  `${filename}_${w}x${h}.jpg`;

export const join = path.join;
