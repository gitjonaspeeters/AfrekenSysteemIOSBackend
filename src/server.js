"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = __importDefault(require("./routes/products"));
const orders_1 = __importDefault(require("./routes/orders"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
dotenv_1.default.config();
//routes importeren
const PORT = process.env.PORT || 3000;
app.use('/products', products_1.default);
app.use('/orders', orders_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});
app.get('/env', (req, res) => {
    res.status(200).json({ databaseurl: process.env.DATABASE_URL || 'development' });
});
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});
