"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middle_1 = __importDefault(require("../Middleware/middle"));
const mescontroller_1 = require("../Controllers/mescontroller");
const router = express_1.default.Router();
router.post("/send/:id", middle_1.default, mescontroller_1.Sendmessage);
router.get("/conversations", middle_1.default, mescontroller_1.Sidebar);
router.get("/:id", middle_1.default, mescontroller_1.Getmsg);
exports.default = router;
