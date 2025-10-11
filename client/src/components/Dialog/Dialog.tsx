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
import { Separator } from "../ui/separator";

interface Props {
    nome: string;
    especie: string;
    descricao: string;
    imagem: string;
    
}

export default function DialogWindow({ nome, especie, descricao, imagem }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
            +Info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sobre {nome}</DialogTitle>
          <div className="h-100">
            <div className="h-64 mt-2 flex gap-2.5 flex-col">
                <div className="h-full flex justify-center items-center">
                  <img src={imagem} className="min-h-48 h-full rounded-2xl" alt="imagem de Maze" />
                </div>
                <span className="font-bold text-2xl">Descrição</span>
                <span className="text-[18px]">{descricao}</span>
                <Separator />
                <span className="font-bold text-2xl">Dados</span>
                <span>Espécie: {especie}</span>
                <Separator />
                <span className="font-bold text-2xl">Dados do responsável</span>
                {/* <span>Nome: {responsavel.nome}</span> */}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
