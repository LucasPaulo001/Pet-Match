import mongoose, { Schema, Types } from "mongoose";

interface IPets {
    nome: string;
    especie: string;
    responsavel: Types.ObjectId;
    descricao: string;
    idade: number;
    porte: string;
    imagem: string;
};

const PetSchema = new Schema<IPets>({
    nome: {
        type: String,
        required: true
    },

    especie: {
        type: String,
        required: true
    },

    idade: {
        type: Number
    },

    responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    porte: {
        type: String
    },

    descricao: {
        type: String,
        required: true
    },

    imagem: {
        type: String,
    }
});

export default mongoose.model("Pet", PetSchema);
