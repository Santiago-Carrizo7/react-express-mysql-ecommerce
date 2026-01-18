import { validateUser, validatePartialUser } from '../schemas/userSchema.js';
import { UserModel } from '../models/mysql/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SALT_ROUNDS, SECRET_JWT_KEY } from '../config/config.js';

export class AuthController {
    static async register (req, res) {
        const result = validateUser(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const { name, email, password, phone } = result.data;
        
        try {
            const salt = Number(SALT_ROUNDS);
             
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await UserModel.create({ name, email, password: hashedPassword, phone });
            
            res.status(201).json({ message: 'Usuario registrado', user: newUser })
        } catch (e) {
            console.error('Error en authController register:', e);
            res.status(500).json({ error: 'Hubo un error al registrar el usuario' });
        }

    }

    static async login (req, res) {
        const result = validatePartialUser(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        
        const { email, password } = result.data;

        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: 'Usuario no Encontrado' });
            }
            
            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                return res.status(401).json({ message: 'La contraseña es incorrecta' });
            } 
            
            
            const token = jwt.sign(
                { id: user.id, email: user.email},
                SECRET_JWT_KEY,
                { expiresIn: '1h'}
            );

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            });

            const { password: _, ...publicUser } = user;
            
            return res.json({ message: 'Login exitoso', user: publicUser });
            
        } catch (e) {
            console.error('Error en el login:', e);
            res.status(500).json({ error: 'Error interno del servidor' });
        }

    }

    static logout (req, res) {
        res.json({ message: 'Logout' });
    }
}