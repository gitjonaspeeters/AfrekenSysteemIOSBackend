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
    try {
      const { name, price, imageUrl } = req.body;
      
      // Validation
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Product name is required' });
      }
      
      if (!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Valid price is required' });
      }
      
      if (imageUrl && typeof imageUrl !== 'string') {
        return res.status(400).json({ error: 'Image URL must be a string' });
      }

      const product = await prisma.product.create({
        data: { 
          name: name.trim(), 
          price, 
          imageUrl: imageUrl || '' 
        },
      });
      
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
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