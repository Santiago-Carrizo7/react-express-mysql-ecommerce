import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/config.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;

    req.session = { user: null };

    try {
        const data = jwt.verify(token, SECRET_JWT_KEY);
        req.session.user = data;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Acceso denegado: Token inválido o expirado'});
    }

}