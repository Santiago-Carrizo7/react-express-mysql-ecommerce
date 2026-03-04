import mysql from 'mysql2/promise';
import { DEFAULT_CONFIG } from './config.js';

export const pool = mysql.createPool({
    ...DEFAULT_CONFIG,
});
