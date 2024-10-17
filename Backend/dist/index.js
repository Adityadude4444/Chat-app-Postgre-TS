"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authrouter_1 = __importDefault(require("./Routers/authrouter"));
const messagerouter_1 = __importDefault(require("./Routers/messagerouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello");
});
app.use("/api/user", authrouter_1.default);
app.use("/api/messages", messagerouter_1.default);
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
