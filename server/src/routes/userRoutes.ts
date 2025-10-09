import express from "express";
const userRouter = express.Router();

import { register, login, profile, registerPet } from "../controllers/userController.js";
import { authGuard } from "../middlewares/authGurard.js";
import upload from "../middlewares/upload.js";

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", authGuard, profile);
userRouter.post("/register-pet", authGuard, upload.single("imagem"), registerPet);


export default userRouter;