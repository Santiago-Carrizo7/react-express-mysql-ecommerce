import mysql2 from 'mysql2/promise';
import { randomUUID } from 'node:crypto';
import { DEFAULT_CONFIG } from '../../config/config.js';

import type { UserFromDB } from '../../types/index.js';
import type { User } from '../../schemas/userSchema.js';

const connection = await mysql2.createConnection(DEFAULT_CONFIG);

export class UserModel {
    static async create ({ name, email, password, phone } : User) {
        const uuid = randomUUID();
        const sql = `
            INSERT INTO user (id, name, email, password, phone)
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?)
        `;

        try {
            await connection.query(sql, [uuid, name, email, password, phone]);
            return { id: uuid, name, email, phone };
        } catch (error) {
            console.error('Error en create user:', error);
            
            if (typeof error === 'object' && error !== null && 'code' in error){
                if (error.code === 'ER_DUP_ENTRY') {
                    throw new Error('El email ya está registrado');
                }

                throw new Error('Error creating user');
            }
            
        }
    }

    static async findByEmail ({ email } : {email: string}) {
        const sql = `
            SELECT BIN_TO_UUID(id) id, name, email, password
            FROM user
            WHERE email = ?
        `;

        try {
            const [users] = await connection.query(sql, [email]) as [UserFromDB[], unknown];
            if (users.length === 0) return null;
            
            return users[0];
        } catch (e) {
            console.error('Error en findByEmail:', e);
            throw new Error('Error finding user');
        }
    }

    static async findById ({ id } : {id: string}){
        const sql = `
            SELECT BIN_TO_UUID(id) id, name, email, phone
            FROM user
            WHERE id = UUID_TO_BIN(?)
        `;  
        try {
            const [users] = await connection.query(sql, [id]) as [UserFromDB[], unknown];
            if (users.length === 0) return null;
            
            return users[0];
        } catch (e) {
            console.error('Error en findById :', e);
            throw new Error('Error finding user');
        }
    }
}