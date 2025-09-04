import supertest from 'supertest';
import app from '../server';
import path from 'path';
import fs from 'fs';

const request = supertest(app);

describe('GET /api/images endpoint', () => {
  it('responds 200 and returns an image when params are valid', async () => {
    const res = await request
      .get('/api/images')
      .query({ filename: 'tree', width: 200, height: 200 });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/jpeg/);
  });

  it('returns 400 for missing filename', async () => {
    const res = await request.get('/api/images').query({ width: 100, height: 100 });
    expect(res.status).toBe(400);
  });

  it('caches output file on disk', async () => {
    const out = path.resolve('assets/thumb/tree_200x200.jpg');
    if (fs.existsSync(out)) fs.unlinkSync(out);
    await request.get('/api/images').query({ filename: 'tree', width: 200, height: 200 });
    expect(fs.existsSync(out)).toBeTrue();
  });
});
