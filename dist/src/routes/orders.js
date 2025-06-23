"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const orders = yield prisma.order.findMany({
        where: { userId: userId },
        include: { OrderProducts: true },
    });
    res.status(200).json(orders);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, items } = req.body;
    const productIds = items.map((item) => item.productId);
    const products = yield prisma.product.findMany({
        where: { id: { in: productIds } }
    });
    const totalAmount = items.reduce((acc, item) => {
        const product = products.find(p => p.id === item.productId);
        return acc + (product ? product.price * item.quantity : 0);
    }, 0);
    const order = yield prisma.order.create({
        data: {
            userId,
            totalAmount,
            OrderProducts: {
                create: items,
            },
        },
        include: { OrderProducts: true },
    });
    res.status(201).json(order);
}));
exports.default = router;
