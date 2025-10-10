import mongoose, { Schema, Types } from "mongoose";

interface IPets {
    nome: string;
    especie: string;
    dono: Types.ObjectId;
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

    dono: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
