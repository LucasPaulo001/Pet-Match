import mongoose, { Schema } from "mongoose";

interface IPets {
    nome: string;
    especie: string;
    descricao: string;
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

    descricao: {
        type: String,
        required: true
    },

    imagem: {
        type: String,
    }
});

export default mongoose.model("Pet", PetSchema);
