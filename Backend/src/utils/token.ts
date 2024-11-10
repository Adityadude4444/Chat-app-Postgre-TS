import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();
async function generatetokenandsetcookie(id: string, res: Response) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });
  return token;
}

export default generatetokenandsetcookie;
