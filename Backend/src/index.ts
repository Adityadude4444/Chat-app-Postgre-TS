import express from "express";
import cors from "cors"; // Import CORS
import authroutes from "./Routers/authrouter";
import messagerouth from "./Routers/messagerouter";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";

dotenv.config();
const app = express();

// Configure CORS to allow requests from your frontend's origin
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Enable cookies to be sent with requests
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
