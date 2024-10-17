"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontroller_1 = require("../Controllers/authcontroller");
const middle_1 = __importDefault(require("../Middleware/middle"));
const router = express_1.default.Router();
// Define routes for authentication
router.post("/signup", authcontroller_1.Signup);
router.post("/login", authcontroller_1.Login);
router.post("/logout", authcontroller_1.Logout);
router.get("/myinfo", middle_1.default, authcontroller_1.getMe);
exports.default = router;
