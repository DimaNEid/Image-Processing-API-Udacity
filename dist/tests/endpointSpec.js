"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const request = (0, supertest_1.default)(server_1.default);
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
        const out = path_1.default.resolve('assets/thumb/tree_200x200.jpg');
        if (fs_1.default.existsSync(out))
            fs_1.default.unlinkSync(out);
        await request.get('/api/images').query({ filename: 'tree', width: 200, height: 200 });
        expect(fs_1.default.existsSync(out)).toBeTrue();
    });
});
