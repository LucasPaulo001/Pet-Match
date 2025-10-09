import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authGurard.js";
import bcrypt from "bcrypt";
import Pet from "../models/Pet.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

//Gerar token
const generateToken = (id: string) => {
  if (!JWT_SECRET) {
    console.error("Erro ao acessar a variável de ambiente 'JWT_SECRET'");
    return null;
  }

  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
};

//Registro do usuário
export const register = async (req: CustomRequest, res: Response) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({
        Erro: "Usuário já existe!",
      });
    }

    //hash de senha
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(senha, salt);

    const newUser = await User.create({
      nome,
      email,
      senha: hashPass,
      tipo,
    });

    return res.status(201).json({
      _id: newUser._id,
    });
  } catch (error: any) {
    return res.status(500).json({
      Erro: "Erro interno do servidor! (registro)",
    });
  }
};

//Login do usuário
export const login = async (req: CustomRequest, res: Response) => {
  const { email, senha } = req.body;

  try {

    const user = await User.findOne({ email });

    if(!user){
        return res.status(422).json({
            Erro: "Usuário não encontrado."
        });
    };

    //Comparação de senha
    if(!(bcrypt.compare(senha, user.senha))){
        return res.status(422).json({
            Erro: "Senha incorreta."
        });
    };

    return res.status(200).json({
        _id: user._id,
        token: generateToken(user.id)
    });

  } catch (error: any) {
    return res.status(500).json({
      Erro: "Erro interno do servidor! (registro)",
    });
  }
};

//Recuperando dados do usuário
export const profile = async (req: CustomRequest, res: Response) => {
  try{
    const user = req.user;
    res.status(200).json(user);
  }
  catch(error: any){
    return res.status(500).json({
      Erro: "Erro interno do servidor! (registro)",
    });
  }
};

//Cadastrando Pet para adoção
export const registerPet = async (req: CustomRequest, res: Response) => {
  try{
    const { nome, especie, descricao } = req.body;

    const imageUrl = (req.file as any)?.path;

    const userId = req.user;

    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({
        error: "Usuário não encontrado!"
      });
    };

    const pet = await Pet.create({
      nome,
      especie,
      descricao,
      imagem: imageUrl
    });

    await user.petsCadastrados.push(pet.id);

    await user.save();

    res.status(201).json({
      message: "Pet cadastrado com sucesso!",
      pet: pet
    });

  }
  catch(error: any){
    return res.status(500).json({
      Erro: "Erro interno do servidor! (registro)",
    });
  }
}


