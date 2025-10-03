import express from "express";
const userRouter = express.Router();

import { register, login } from "../controllers/userController.js";

userRouter.post("/register", register);
userRouter.post("/login", login);


export default userRouter;