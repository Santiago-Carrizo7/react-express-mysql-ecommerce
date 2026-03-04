import express from 'express';
import cookieParser from 'cookie-parser';
import { productsRouter } from './routes/productRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { paymentRouter } from './routes/paymentRoutes.js';
import { corsMiddleware } from './middlewares/cors.js';
import { PORT } from './config/config.js';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware());


app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/payments', paymentRouter);

if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log('Servidor Corriendo en http://localhost:' + PORT);
  });
}
