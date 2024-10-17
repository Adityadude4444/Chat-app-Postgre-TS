import express from "express";
import authroutes from "./Routers/authrouter";
import messagerouth from "./Routers/messagerouter";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieparser());
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/user", authroutes);

app.use("/api/messages", messagerouth);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
