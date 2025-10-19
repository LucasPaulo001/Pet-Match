import express from "express";
const userRouter = express.Router();

import { register, login, profile, registerPet, listMyPets, listPets, editUser, deletePet } from "../controllers/userController.js";
import { authGuard } from "../middlewares/authGurard.js";
import upload from "../middlewares/upload.js";

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", authGuard, profile);
userRouter.post("/register-pet", authGuard, upload.single("imagem"), registerPet);
userRouter.get("/list-my-pets", authGuard, listMyPets);
userRouter.get("/list-pets", listPets);
userRouter.patch("/edit-data", authGuard, editUser);
userRouter.delete("/delete-pet/:petId", authGuard, deletePet);


export default userRouter;