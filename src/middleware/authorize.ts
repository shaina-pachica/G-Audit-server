import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/token";

declare global {
  namespace Express {
    interface Request {
      user?: { username: string, roles: ("Owner" | "Employee" | undefined)[] };
    }
  }
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json("Missing on invalid Authorization header")
    }
    const token = header.split(" ")[1];
    const payload = verifyAccessToken(token)
    req.user = { username: payload.username, roles: payload.roles }
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
