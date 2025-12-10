import jwt from "jsonwebtoken"
import { Response } from "express"

type JWTPayload = {
  username: string
}

const ACCESS_EXPIRES = "5m"
const REFRESH_EXPIRES = "30d"

export function signAccessToken(payload: JWTPayload) {
  return jwt.sign(payload, process.env.SECRET!, {
    expiresIn: ACCESS_EXPIRES
  })
}

export function signRefreshToken(payload: JWTPayload) {
  return jwt.sign(payload, process.env.REFRESH_SECRET!, {
    expiresIn: REFRESH_EXPIRES
  })
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, process.env.SECRET!) as JWTPayload
}

export function verifyRefreshToken(token: string): JWTPayload {
  return jwt.verify(token, process.env.REFRESH_SECRET!) as JWTPayload
}

export async function storeRefreshToken(token: string, res: Response) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export async function removeRefreshToken(res: Response) {
  res.clearCookie("refreshToken");
}
