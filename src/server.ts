import express, {Request, Response } from 'express';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

//routes importeren



const PORT = process.env.PORT || 3000;

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
});

app.get('/env', (req: Request, res: Response) => {
    res.status(200).json({ databaseurl: process.env.DATABASE_URL || 'development' });
}
);


app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT );
    }
);