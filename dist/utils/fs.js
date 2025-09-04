"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = exports.buildThumbName = exports.fileExists = exports.ensureDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ensureDir = async (dir) => {
    await fs_1.default.promises.mkdir(dir, { recursive: true });
};
exports.ensureDir = ensureDir;
const fileExists = async (p) => {
    try {
        await fs_1.default.promises.access(p, fs_1.default.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
};
exports.fileExists = fileExists;
const buildThumbName = (filename, w, h) => `${filename}_${w}x${h}.jpg`;
exports.buildThumbName = buildThumbName;
exports.join = path_1.default.join;
