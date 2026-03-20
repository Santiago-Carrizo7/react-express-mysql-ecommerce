import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { validateUser } from "../schemas/userSchema.js";
import { validateLogin } from "../schemas/loginSchema.js";

import { UserModel } from "../models/mysql/userModel.js";
import { RefreshTokenModel } from "../models/mysql/refreshTokenModel.js";

import { SALT_ROUNDS, SECRET_JWT_KEY } from "../config/config.js";
import { setAuthCookies } from "../utils/authUtils.js";

import type { Request, Response, NextFunction } from "express";
import type { UserFromDB } from "../types/index.js";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
      }) as UserFromDB;

      await setAuthCookies(newUser, res);

      const { password: _, ...publicUser } = newUser;

      return res.status(201).json({ user: publicUser });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const result = validateLogin(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { email, password } = result.data;

    try {
      const user = (await UserModel.findByEmail({ email })) as UserFromDB;

      if (!user) {
        return res.status(401).json({ error: "Usuario no Encontrado" });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: "La contraseña es incorrecta" });
      }

      await setAuthCookies(user, res);

      const { password: _, ...publicUser } = user;

      return res.json({ message: "Login exitoso", user: publicUser });
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ error: "No hay token de refresco" });
    }

    try {
      const tokenDB = await RefreshTokenModel.findByToken({
        token: refreshToken,
      });

      if (!tokenDB) {
        return res
          .status(403)
          .json({ error: "Token de refresco inválido o revocado" });
      }

      const currentDate = new Date();
      const expirationDate = new Date(tokenDB.expires_at);

      if (currentDate > expirationDate) {
        await RefreshTokenModel.delete({ token: refreshToken });
        res.clearCookie("refresh_token");
        res.clearCookie("access_token");
        return res
          .status(401)
          .json({ error: "Token expirado, por favor inicia sesión de nuevo" });
      }

      const newAccessToken = jwt.sign(
        { id: tokenDB.user_id, email: tokenDB.email },
        SECRET_JWT_KEY,
        { expiresIn: "15Min" },
      );

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });

      return res.json({ message: "Token refrescado" });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const refresh_token = req.cookies.refresh_token;

      if (refresh_token) {
        await RefreshTokenModel.delete({ token: refresh_token });
      }

      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      return res.json({ message: "Logout exitoso" });
    } catch (e) {
      next(e);
    }
  }

  static async verifyAuth(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { id } = req.session.user;

    try {
      const user = await UserModel.findById({ id });

      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }
}
