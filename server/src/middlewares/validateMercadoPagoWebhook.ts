import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express';

export const validateMercadoPagoWebhook = (req: Request, res: Response, next: NextFunction): void => {
    const signatureHeader = req.headers['x-signature'] as string | undefined;
    const requestId = req.headers['x-request-id'] as string | undefined;
    const dataId = req.body?.data?.id;

    if (!signatureHeader || !requestId || !dataId) {
        res.status(400).json({ error: 'Faltan datos requeridos para la validación' });
        return;
    }

    const secretKey = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    if (!secretKey) {
        console.error('MERCADOPAGO_WEBHOOK_SECRET no está configurado en el .env');
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    }

    let ts: string | undefined = undefined;
    let hashRecibido: string | undefined = undefined;

    const parts = signatureHeader.split(',');
    for (const part of parts) {
        const [key, value] = part.split('=');
        if (key === 'ts') ts = value;
        if (key === 'v1') hashRecibido = value;
    }

    if (!ts || !hashRecibido) {
        res.status(400).json({ error: 'Formato de x-signature inválido' });
        return;
    }

    const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;

    const computedHash = crypto
        .createHmac('sha256', secretKey)
        .update(manifest)
        .digest('hex');

    if (computedHash !== hashRecibido) {
        console.warn('Alerta de Seguridad: Firma de Webhook inválida.');
        res.status(403).json({ error: 'Firma inválida' });
        return;
    }

    next();
};