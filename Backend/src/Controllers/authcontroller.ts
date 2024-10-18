import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/token";

// Signup function
export const Signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmpassword || !gender) {
      res.status(400).json({ error: "Please fill all fields" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const profile =
      "https://png.pngtree.com/png-vector/20240427/ourlarge/pngtree-user-icon-brush-vector-png-image_12327707.png";

    const newuser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedpass,
        profile,
        gender,
      },
    });

    if (newuser) {
      await generatetokenandsetcookie(newuser.id, res);
      res.status(201).json({
        pass: hashedpass,
        msg: "User created successfully",
      });
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Login function
export const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Please provide username and password" });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (!existing) {
      res.status(400).json({ msg: "User does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) {
      res.status(401).json({ msg: "Invalid credentials" });
      return;
    }

    const token = await generatetokenandsetcookie(existing.id, res);
    res.status(200).json({ msg: "Login successful", token });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Logout function
export const Logout = (req: Request, res: Response): void => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: "Logged out successfully" });
};

// Get current authenticated user
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ msg: "User not authenticated" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullname: true,
        username: true,
        profile: true,
        gender: true,
      },
    });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
