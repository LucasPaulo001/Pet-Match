import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

export interface CustomRequest extends Request {
  user?: any;
}

export const authGuard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      Erro: "Token inválido!",
    });
  }

  try {
    if (!JWT_SECRET) {
      console.error("Erro ao acessar a variável de ambiente 'JWT_SECRET'");
      return;
    }

    const verification = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(verification.id).select("-senha");

    if(!user){
        return res.status(422).json({
            Erro: "Usuário não encontrado!"
        });
    };
    
    req.user = user;

    return next();

  } catch (error: any) {
    return res.status(500).json({
      Erro: "Erro interno do servidor!",
    });
  }
};
