"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("./fs");
/**
 * Resizes JPG from assets/full/<filename>.jpg and caches to assets/thumb/<filename>_<w>x<h>.jpg
 * Returns absolute output path.
 */
const processImage = async (p) => {
    const src = path_1.default.resolve(p.fullDir, `${p.filename}.jpg`);
    const outName = (0, fs_1.buildThumbName)(p.filename, p.width, p.height);
    const out = path_1.default.resolve(p.thumbDir, outName);
    await (0, fs_1.ensureDir)(p.thumbDir);
    // return cached if exists
    if (await (0, fs_1.fileExists)(out))
        return out;
    // ensure source exists
    if (!(await (0, fs_1.fileExists)(src))) {
        throw new Error(`Input file is missing: ${src}`);
    }
    await (0, sharp_1.default)(src).resize(p.width, p.height).jpeg({ mozjpeg: true }).toFile(out);
    return out;
};
exports.processImage = processImage;
