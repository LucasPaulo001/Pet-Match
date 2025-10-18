"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  responsavel: {
    nome: string;
    tipo: string;
    endereco: {
      rua: string;
      bairro: string;
    };
  };
}

export default function DialogWindow({
  nome,
  especie,
  descricao,
  responsavel,
  imagem,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#6773F1]">+Info</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Sobre {nome}</DialogTitle>
          <DialogDescription>{especie}</DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 mt-2 space-y-4">
          <img
            src={imagem}
            alt={`Imagem de ${nome}`}
            className="w-full md:w-1/2 h-64 object-cover rounded-2xl mx-auto"
          />

          <div className="space-y-2">
            <p className="font-bold text-lg">Descrição</p>
            <p className="text-sm break-words">{descricao}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="font-bold text-lg">Dados do responsável</p>
            <p><strong>Nome:</strong> {responsavel.nome}</p>
            <p><strong>Tipo:</strong> {responsavel.tipo}</p>
            <p>
              <strong>Endereço:</strong> {responsavel.endereco?.rua},{" "}
              {responsavel.endereco?.bairro}
            </p>
            <Button variant={"link"}>
              Sobre {responsavel.nome}
            </Button>
          </div>
          <Separator/>
          <div className="w-full flex flex-col items-center">
            <Button className="bg-[#6773F1]">Quero adotar o(a) {nome}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
