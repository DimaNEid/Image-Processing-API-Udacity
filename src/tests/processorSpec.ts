import path from 'path';
import fs from 'fs';
import { processImage } from '../utils/imageProcessor';

describe('imageProcessor', () => {
  it('creates a resized image', async () => {
    const out = await processImage({
      filename: 'tree',
      width: 123,
      height: 77,
      fullDir: path.resolve('assets/full'),
      thumbDir: path.resolve('assets/thumb'),
    });
    expect(fs.existsSync(out)).toBeTrue();
  });

  it('throws for missing source image', async () => {
    await expectAsync(
      processImage({
        filename: 'does_not_exist',
        width: 100,
        height: 100,
        fullDir: path.resolve('assets/full'),
        thumbDir: path.resolve('assets/thumb'),
      }),
    ).toBeRejected();
  });
});
