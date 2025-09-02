import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"] as string | undefined;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : undefined;
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido" });
  }
};
