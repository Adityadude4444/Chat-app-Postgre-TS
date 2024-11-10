import express from "express";
import cors from "cors";
import authroutes from "./Routers/authrouter";
import messagerouth from "./Routers/messagerouter";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/user", authroutes);
app.use("/api/message", messagerouth);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
