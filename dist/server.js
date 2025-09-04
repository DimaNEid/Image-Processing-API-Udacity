"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./routes/images"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// tiny logger
app.use((req, _res, next) => {
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.path} ${new Date().toISOString()}`);
    next();
});
app.get('/', (_req, res) => {
    res
        .status(200)
        .send('Image Processing API. Try /api/images?filename=tree&width=200&height=200');
});
app.use('/api/images', images_1.default);
// global error handler
app.use((err, _req, res) => {
    res.status(400).send(`Error: ${err.message}`);
});
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${PORT}`);
});
exports.default = app;
