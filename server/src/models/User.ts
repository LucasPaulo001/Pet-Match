import mongoose, { Schema, Types } from "mongoose";

type TypeUser = 'pessoa' | 'ong';

interface IUser {
    nome: string,
    email: string,
    senha: string,
    tipo: TypeUser,
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
