import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/config.js';
import type { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    req.session = { user: null as any };

    try {
        const data = jwt.verify(token, SECRET_JWT_KEY) as unknown as { id: string; email: string };
        req.session.user = data;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Acceso denegado: Token inválido o expirado'});
    }

}