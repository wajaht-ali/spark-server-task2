import express from "express";
import { loginController } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/login", loginController);

export default userRouter;
