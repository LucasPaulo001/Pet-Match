"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface Props {
    nome: string;
    especie: string;
    descricao: string;
    imagem: string;
    dono: any;
}

export default function DialogWindow({ nome, especie, descricao, imagem }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
            +Info
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sobre {nome}</DialogTitle>
          <div>
            <div className="h-64 mt-2 flex justify-center items-center gap-2.5 flex-col">
                <img src={imagem} className="min-h-48 h-full rounded-2xl" alt="imagem de Maze" />
                <span className="font-bold text-2xl">Descrição:</span>
                <span className="text-[18px]">{descricao}</span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
