import { Request, Response, NextFunction } from "express";


interface AuthRequest extends Request {
  user?: {
    username: string;
    roles: ("Employee" | "Owner")[];
  };
}
export const allowRole = (
  ...role: ("Employee" | "Owner")[]
) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !role.some((r) => req.user!.roles.includes(r))) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
