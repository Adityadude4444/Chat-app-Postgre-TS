"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.Logout = exports.Login = exports.Signup = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../utils/token"));
// Signup function
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existing = yield prisma_1.default.user.findUnique({ where: { username } });
        if (existing) {
            res.status(400).json({ msg: "User already exists" });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedpass = yield bcryptjs_1.default.hash(password, salt);
        const profile = "https://png.pngtree.com/png-vector/20240427/ourlarge/pngtree-user-icon-brush-vector-png-image_12327707.png";
        const newuser = yield prisma_1.default.user.create({
            data: {
                fullname,
                username,
                password: hashedpass,
                profile,
                gender,
            },
        });
        if (newuser) {
            yield (0, token_1.default)(newuser.id, res);
            res.status(201).json({
                pass: hashedpass,
                msg: "User created successfully",
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.Signup = Signup;
// Login function
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Please provide username and password" });
            return;
        }
        const existing = yield prisma_1.default.user.findUnique({ where: { username } });
        if (!existing) {
            res.status(400).json({ msg: "User does not exist" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, existing.password);
        if (!isMatch) {
            res.status(401).json({ msg: "Invalid credentials" });
            return;
        }
        const token = yield (0, token_1.default)(existing.id, res);
        res.status(200).json({ msg: "Login successful", token });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.Login = Login;
// Logout function
const Logout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ msg: "Logged out successfully" });
};
exports.Logout = Logout;
// Get current authenticated user
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ msg: "User not authenticated" });
            return;
        }
        const user = yield prisma_1.default.user.findUnique({
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
    }
    catch (error) {
        console.error("Error retrieving user information:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getMe = getMe;
