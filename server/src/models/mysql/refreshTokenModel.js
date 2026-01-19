import mysql2 from 'mysql2/promise';
import { DEFAULT_CONFIG } from '../../config/config.js';
import { randomUUID } from 'node:crypto';

const connection = await mysql2.createConnection(DEFAULT_CONFIG);

export class RefreshTokenModel {
    static async create ({ token, user_id, expiresAt}) {
        const uuid = randomUUID();

        const sql = `
            INSERT INTO refresh_token (id, token, user_id, expires_at)
            VALUES (UUID_TO_BIN(?), ?, UUID_TO_BIN(?), ?)
        `;

        try {
            await connection.query(sql, [uuid, token, user_id, expiresAt]);
            return true;
        } catch (e) {
            console.error('Error al guardar refresh token:', e);
            throw new Error('Error saving refresh token');
        }
    }

    static async findByToken ({ token }) {
        const sql =`
            SELECT 
              BIN_TO_UUID(r.user_id) user_id, 
              r.expires_at,
              u.email,
              u.name
            FROM refresh_token r
            JOIN user u ON u.id = r.user_id 
            WHERE r.token = ?
        `;

        try {
            const [token] = await connection.query(sql, [token]);
            if (token.length === 0) return null;
            return token[0]; 
        } catch (e) {
            console.error('Error buscando refresh token: ', e);
            throw new Error('Error finding token');
        }
    }

    static async delete ({ token }) {
        const sql = `DELETE FROM refresh_token WHERE token = ?`;
        await connection.query(sql, [token]);
    }

    // Para Cerrar Session en todos los dispositivos
    static async deleteAllForUser ({ user_id }) {
        const sql = `DELETE FROM refresh_token WHERE user_id = UUID_TO_BIN(?)`;
        await connection.query(sql, [user_id]);
    }
}