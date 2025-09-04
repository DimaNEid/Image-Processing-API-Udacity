"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageProcessor_1 = require("../utils/imageProcessor");
describe('imageProcessor', () => {
    it('creates a resized image', async () => {
        const out = await (0, imageProcessor_1.processImage)({
            filename: 'tree',
            width: 123,
            height: 77,
            fullDir: path_1.default.resolve('assets/full'),
            thumbDir: path_1.default.resolve('assets/thumb'),
        });
        expect(fs_1.default.existsSync(out)).toBeTrue();
    });
    it('throws for missing source image', async () => {
        await expectAsync((0, imageProcessor_1.processImage)({
            filename: 'does_not_exist',
            width: 100,
            height: 100,
            fullDir: path_1.default.resolve('assets/full'),
            thumbDir: path_1.default.resolve('assets/thumb'),
        })).toBeRejected();
    });
});
