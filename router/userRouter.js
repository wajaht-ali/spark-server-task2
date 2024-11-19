import express from "express";
import { loginController } from "../controllers/userControllers.js";
import { authmiddleware } from "../middlewares/authMidddleware.js";

const userRouter = express.Router();

userRouter.post("/login", authmiddleware, loginController);

export default userRouter;
