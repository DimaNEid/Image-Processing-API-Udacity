import express, { Request, Response, NextFunction } from 'express';
import imagesRouter from './routes/images';

const app = express();
const PORT = process.env.PORT || 3000;

// tiny logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method} ${req.path} ${new Date().toISOString()}`);
  next();
});

app.get('/', (_req, res) => {
  res
    .status(200)
    .send('Image Processing API. Try /api/images?filename=tree&width=200&height=200');
});

app.use('/api/images', imagesRouter);

// global error handler
app.use((err: Error, _req: Request, res: Response) => {
  res.status(400).send(`Error: ${err.message}`);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
