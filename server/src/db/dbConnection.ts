import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.DB_URI;

export const dbConnection = async () => {
    try{
        if(!DB_URI) return console.log("Variável de ambiente 'DB_URI' inválida!");

        await mongoose.connect(DB_URI);

        console.log("Conectado ao mongoose!");
    }
    catch(err: any){
        console.log("Erro ao se conectar ao mongoose!");
    }
}