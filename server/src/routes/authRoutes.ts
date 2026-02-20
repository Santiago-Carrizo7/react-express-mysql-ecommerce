import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/session.js';

export const authRouter = Router();

authRouter.post('/register', AuthController.register);

authRouter.post('/login', AuthController.login);

authRouter.post('/refresh', AuthController.refresh);

authRouter.post('/logout', AuthController.logout);

authRouter.get('/verify', authMiddleware, AuthController.verifyAuth);