import express from "express";
import authroutes from "./Routers/authrouter";
import messagerouth from "./Routers/messagerouter";
const app = express();
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/user", authroutes);
app.use("/api/messages", messagerouth);
app.listen(5000);
