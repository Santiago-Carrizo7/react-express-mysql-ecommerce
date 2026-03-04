import { Router } from 'express';
import { validateMercadoPagoWebhook } from '../middlewares/validateMercadoPagoWebhook.js';
import { PaymentController } from '../controllers/paymentController.js';

export const paymentRouter = Router();

paymentRouter.post('/create-preference', PaymentController.createPaymentIntent);
paymentRouter.post('/webhook/mercadopago', validateMercadoPagoWebhook, PaymentController.handleWebhook);