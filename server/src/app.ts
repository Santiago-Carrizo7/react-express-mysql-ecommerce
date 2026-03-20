import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { productsRouter } from './routes/productRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { paymentRouter } from './routes/paymentRoutes.js';
import { corsMiddleware } from './middlewares/cors.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { PORT } from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware());


app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/payments', paymentRouter);

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Servidor Corriendo en http://localhost:' + PORT);
  });

