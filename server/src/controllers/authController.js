import { validateUser, validatePartialUser } from "../schemas/userSchema.js";
import { UserModel } from "../models/mysql/userModel.js";
import { RefreshTokenModel } from "../models/mysql/refreshTokenModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, SECRET_JWT_KEY } from "../config/config.js";
import { randomUUID } from "node:crypto";

export class AuthController {
  static async register(req, res) {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { name, email, password, phone } = result.data;

    try {
      const salt = Number(SALT_ROUNDS);

      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
      });

      res.status(201).json({ message: "Usuario registrado", user: newUser });
    } catch (e) {
      console.error("Error en authController register:", e);
      res.status(500).json({ error: "Hubo un error al registrar el usuario" });
    }
  }

  static async login(req, res) {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { email, password } = result.data;

    try {
      const user = await UserModel.findByEmail({ email });

      if (!user) {
        return res.status(401).json({ error: "Usuario no Encontrado" });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: "La contraseña es incorrecta" });
      }

      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_JWT_KEY,
        { expiresIn: "15Min" },
      );

      const refreshToken = randomUUID();

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      await RefreshTokenModel.create({
        token: refreshToken, 
        user_id: user.id, 
        expiresAt: expirationDate,
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7
      });

      const { password: _, ...publicUser } = user;

      return res.json({ message: "Login exitoso", user: publicUser });
    } catch (e) {
      console.error("Error en el login:", e);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async refresh(req, res) {
    const refreshToken = req.cookies.refresh_token; 

    if (!refreshToken) {
        return res.status(401).json({ error: 'No hay token de refresco' });
    }

    try {
        const tokenDB = await RefreshTokenModel.findByToken({refreshToken});

        if (!tokenDB) {
            return res.status(403).json({ error: 'Token de refresco inválido o revocado' });
        }

        const currentDate = new Date();
        const expirationDate = new Date(tokenDB.expires_at); 

        if (currentDate > expirationDate) {
            await RefreshTokenModel.delete(refreshToken);
            res.clearCookie('refresh_token');
            res.clearCookie('access_token');
            return res.status(401).json({ error: 'Token expirado, por favor inicia sesión de nuevo' });
        }

        const newAccessToken = jwt.sign(
            { id: tokenDB.user_id, email: tokenDB.email },
            SECRET_JWT_KEY,
            { expiresIn: '15Min' }
        );

        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        });

        res.json({ message: 'Token refrescado' });

    } catch (e) {
        console.error('Error en refresh:', e);
        res.status(500).json({ error: 'Error interno' });
    }
  }

  static async logout(req, res) {
    const refresh_token  = req.cookies.refresh_token;
    
    if (refresh_token) {
        await RefreshTokenModel.delete({ token: refresh_token });
    }
    
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    
    res.json({ message: "Logout exitoso" });
  }

  static async verifyAuth(req, res) {
    const { id } = req.session.user;

    try {
      const user = await UserModel.findById({ id });
      
      if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      return res.json({ user });
    } catch (e) {
      console.error('Error en verify:', e);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
}
