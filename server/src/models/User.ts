import mongoose, { Schema, Types } from "mongoose";

type TypeUser = 'pessoa' | 'ong';

interface IEndereco {
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
}

interface IUser {
    nome: string,
    email: string,
    senha: string,
    tipo: TypeUser,
    endereco?: IEndereco,
    petsCadastrados: Types.ObjectId[]
}

const UserSchema = new Schema<IUser>({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true
    },
    endereco: {
        rua: String,
        numero: String,
        bairro: String,
        cidade: String,
        estado: String,
    },
    tipo: {
        type: String,
        enum: ['pessoa', 'ong'],
        default: 'pessoa'
    },
    petsCadastrados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }]
});

export default mongoose.model<IUser>("User", UserSchema);
