import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/userRouter.js";
import { myDB } from "./config/db.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

myDB.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(userRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port http://localhost:${port}`);
});
