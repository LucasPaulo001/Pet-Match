import express, { Request, Response } from "express";
const router = express.Router();

router.get("/welcome", (req: Request, res: Response) => {
    res.json({Content: "Olá, bem vindo(a) ao PetMatch!"});
})

//V5qkyQEsPTIcsjJQ
export default router;