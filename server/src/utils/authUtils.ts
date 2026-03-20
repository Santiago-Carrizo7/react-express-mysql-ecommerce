import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import type { Response } from "express";

import { RefreshTokenModel } from "../models/mysql/refreshTokenModel.js";
import { SECRET_JWT_KEY } from "../config/config.js";
import type { UserFromDB } from "../types/index.js";

export async function setAuthCookies(user: UserFromDB, res: Response): Promise<void> {
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

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
}
