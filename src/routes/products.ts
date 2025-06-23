import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
      const products = await prisma.product.findMany(); 
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.get('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
  
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/', async (req, res) => {
    const { name, price, imageUrl } = req.body;
    const product = await prisma.product.create({
      data: { name, price, imageUrl },
    });
    res.status(201).json(product);
  });

router.put('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price, imageUrl } = req.body;
    const product = await prisma.product.update({
      where: { id: productId },
      data: { name, price, imageUrl },
    });
    res.status(200).json(product);
  });


router.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    await prisma.product.delete({
      where: { id: productId },
    });
    res.status(204).send();
  });

  

export default router;