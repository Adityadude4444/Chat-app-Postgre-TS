import express from "express";
import middle from "../Middleware/middle";
import { Getmsg, Sendmessage, Sidebar } from "../Controllers/mescontroller";
const router = express.Router();
router.post("/send/:id", middle, Sendmessage);
router.get("/conversations", middle, Sidebar);
router.get("/:id", middle, Getmsg);

export default router;
