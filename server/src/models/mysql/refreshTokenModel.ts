import mysql2 from 'mysql2/promise';
import { DEFAULT_CONFIG } from '../../config/config.js';
import { randomUUID } from 'node:crypto';

import type { RefreshToken } from '../../types/index.js';

const connection = await mysql2.createConnection(DEFAULT_CONFIG);

export class RefreshTokenModel {
    static async create ({ token, user_id, expiresAt} : RefreshToken) {
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

    static async findByToken ({ token } : { token: string }) {
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
            const [tokenDB] = await connection.query(sql, [token]) as [{ user_id: string, expires_at: Date, email: string, name: string }[], unknown];
            if (tokenDB.length === 0) return null;
            return tokenDB[0]; 
        } catch (e) {
            console.error('Error buscando refresh token: ', e);
            throw new Error('Error finding token');
        }
    }

    static async delete ({ token } : { token: string }) {
        const sql = `DELETE FROM refresh_token WHERE token = ?`;
        await connection.query(sql, [token]);
    }

    
    static async deleteAllForUser ({ user_id } : { user_id: string }) {
        const sql = `DELETE FROM refresh_token WHERE user_id = UUID_TO_BIN(?)`;
        await connection.query(sql, [user_id]);
    }
}