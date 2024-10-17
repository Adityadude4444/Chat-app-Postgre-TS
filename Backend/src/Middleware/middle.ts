import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
}

const middle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ msg: "No token, authorization denied" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    req.user = decoded.id;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default middle;
