import express from 'express';
import { productsRouter } from './routes/productRoutes.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.use('/products', productsRouter);

const PORT = process.env.PORT ?? '1234';

app.listen(PORT, () => {
  console.log('Servidor Corriendo en http://localhost:' + PORT);
});
