import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import { processImage } from '../utils/imageProcessor';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filename = String(req.query.filename || '').trim();
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    // Custom error handling with proper status codes
    if (!filename) {
      return res.status(400).json({ error: 'Query param "filename" is required.' });
    }
    if (!Number.isFinite(width) || width <= 0) {
      return res.status(400).json({ error: '"width" must be a positive number.' });
    }
    if (!Number.isFinite(height) || height <= 0) {
      return res.status(400).json({ error: '"height" must be a positive number.' });
    }

    const fullDir = path.resolve('assets/full');
    const thumbDir = path.resolve('assets/thumb');

    const outPath = await processImage({
      filename,
      width,
      height,
      fullDir,
      thumbDir,
    });

    // Serve the file
    res.status(200).sendFile(outPath);
  } catch (err) {
    // Handle specific errors from processImage
    if (err instanceof Error) {
      if (err.message.includes('missing') || err.message.includes('not found')) {
        return res.status(404).json({ error: err.message });
      }
      if (err.message.includes('invalid') || err.message.includes('unsupported')) {
        return res.status(400).json({ error: err.message });
      }
    }
    // For any other unexpected errors, pass to default error handler (500)
    next(err);
  }
});

export default router;