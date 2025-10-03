import express, { Request, Response } from "express";
const router = express.Router();

import userRouter from "./userRoutes.js";

router.use("/api/users", userRouter);

//V5qkyQEsPTIcsjJQ
export default router;