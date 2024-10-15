"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authrouter_1 = __importDefault(require("./Routers/authrouter"));
const messagerouter_1 = __importDefault(require("./Routers/messagerouter"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello");
});
app.use("/api/user", authrouter_1.default);
app.use("/api/messages", messagerouter_1.default);
app.listen(5000);
