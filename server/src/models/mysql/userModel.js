import mysql2 from 'mysql2/promise';
import { randomUUID } from 'node:crypto';
import { DEFAULT_CONFIG } from '../../config/config.js';

const connection = await mysql2.createConnection(DEFAULT_CONFIG);

export class UserModel {
    static async create ({ name, email, password, phone }) {
        const uuid = randomUUID();
        const sql = `
            INSERT INTO user (id, name, email, password, phone)
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?)
        `;

        try {
            await connection.query(sql, [uuid, name, email, password, phone]);
            return { id: uuid, name, email, phone };
        } catch (e) {
            console.error('Error en create user:', e);

            if (e.code === 'ER_DUP_ENTRY') {
                throw new Error('El email ya está registrado');
            }

            throw new Error('Error creating user');
        }
    }

    static async findOne ({ email }){
        const sql = `
            SELECT BIN_TO_UUID(id) id, name, email, password
            FROM user
            WHERE email = ?
        `;

        try {
            const [users] = await connection.query(sql, [email]);
            if (users.length === 0) return null;
            
            return users[0];
        } catch (e) {
            console.error('Error en findOne:', e);
            throw new Error('Error finding user');
        }
    }

}