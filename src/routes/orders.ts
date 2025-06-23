import express, { Request, Response } from 'express';

import { Product, ProductProductInput } from '../../types/product';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();



router.get('/', async (req: Request, res: Response) => {
    const { userId } = req.query;
    const orders = await prisma.order.findMany({
      where: { userId: userId as string },
      include: { OrderProducts: true }, 
    });
    res.status(200).json(orders);
  });


router.post('/', async (req: Request, res: Response) => {
    const { userId, items } = req.body;


    const productIds = items.map((item: ProductProductInput) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });


    const totalAmount = items.reduce((acc: number, item: ProductProductInput) => {
      const product = products.find(p => p.id === item.productId);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);

    const order = await prisma.order.create({
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
  });






export default router;