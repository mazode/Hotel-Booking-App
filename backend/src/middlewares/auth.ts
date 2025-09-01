import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
