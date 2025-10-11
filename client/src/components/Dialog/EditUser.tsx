"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { Separator } from "../ui/separator";
import { IUser, useAuth } from "@/contexts/AuthContext";
import { SpinnerCustom } from "../ui/spinner";
import { toast } from "sonner";

interface Props {
  nome?: string;
  tipo?: string;
  senha?: string;
  confirmSenha?: string;
  endereco?: {
    rua?: string;
    bairro?: string;
    numero?: string;
    cidade?: string;
    estado?: string;
  };
}

export default function EditWindow({
  nome,
  tipo,
  endereco,
  confirmSenha,
  senha,
}: Props) {
  const [formData, setFormData] = useState({
    nome: nome || "",
    tipo: tipo || "",
    senha: senha || "",
    confirmSenha: confirmSenha || "",
    rua: endereco?.rua || "",
    numero: endereco?.numero || "",
    bairro: endereco?.bairro || "",
    cidade: endereco?.cidade || "",
    estado: endereco?.estado || "",
  });

  const { editData, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados atualizados:", formData);

    //Payload customizado para a requisição do backend
    const payload: Partial<IUser> = {
      nome: formData.nome || undefined,
      tipo: formData.tipo || undefined,
      senha: formData.senha || undefined,
      endereco: {
        ...formData.rua && { rua: formData.rua },
        ...formData.numero && { numero: formData.numero },
        ...formData.bairro && { bairro: formData.bairro },
        ...formData.cidade && { cidade: formData.cidade },
        ...formData.estado && { estado: formData.estado },
      },
    };

    if (payload.senha != formData.confirmSenha && formData.confirmSenha.length > 0) {
      return toast("As senhas não estão iguais");
    }

    await editData(payload);

    toast("Dados editados com sucesso!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#6773F1] hover:bg-[#5660d1]">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar dados de {nome}</DialogTitle>
          <DialogDescription>
            Altere apenas os campos desejados e clique em salvar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome"
              />
            </div>

            <div>
              <Label htmlFor="tipo">Tipo de usuário</Label>
              <Input
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                placeholder="Ex: responsável, adotante..."
              />
            </div>

            <div>
              <Label htmlFor="tipo">Senha</Label>
              <Input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Informe a nova senha..."
              />
            </div>

            <div>
              <Label htmlFor="tipo">Repita senha</Label>
              <Input
                type="password"
                id="senha"
                name="confirmSenha"
                value={formData.confirmSenha}
                onChange={handleChange}
                placeholder="Repita a nova senha..."
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="rua">Rua</Label>
              <Input
                id="rua"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                placeholder="Rua"
              />
            </div>

            <div>
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Número"
              />
            </div>

            <div>
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Bairro"
              />
            </div>

            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Cidade"
              />
            </div>

            <div>
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                placeholder="Estado"
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={loading}
              type="submit"
              className="bg-[#6773F1] hover:bg-[#5660d1]"
            >
              {loading ? (
                <span className="flex gap-3">
                  <SpinnerCustom /> Editando...
                </span>
              ) : (
                <span>Salvar alterações</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
