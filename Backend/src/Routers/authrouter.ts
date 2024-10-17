import express from "express";
import { Signup, Login, Logout, getMe } from "../Controllers/authcontroller";
import middle from "../Middleware/middle";

const router = express.Router();

// Define routes for authentication
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/myinfo", middle, getMe);

export default router;
