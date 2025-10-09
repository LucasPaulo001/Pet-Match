import express from "express";
const userRouter = express.Router();

import { register, login, profile, registerPet } from "../controllers/userController.js";
import { authGuard } from "../middlewares/authGurard.js";

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", authGuard, profile);
userRouter.post("/register-pet", authGuard, registerPet);


export default userRouter;