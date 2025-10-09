"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { SpinnerCustom } from "@/components/ui/spinner";

import ProfileData from "@/components/Profile/ProfileData";

type LoginFormValues = {
  nome: string;
  especie: string;
  descricao: string;
  imagem: FileList;
}

export default function Profile() {
  const { registerPet, loading, success } = useAuth();

  const form = useForm<LoginFormValues>({
    defaultValues: { nome: "", especie: "", descricao: "", imagem: undefined as any },
  });

 
  const onSubmit = async (data: LoginFormValues) => {
    try {
      await registerPet(data.nome, data.especie, data.descricao, data.imagem);

      toast(`Pet ${data.nome} cadastrado(a) com sucesso!`);

      form.reset();

    } catch (error: any) {
      const message =
        error.response?.data?.error || "Erro ao realizar cadastro.";
      toast(message);
    }
  };

  return (
    <div className="flex items-center w-full justify-center p-3 h-full">
      <div className="w-100 flex justify-center items-center">
        <Card className="w-full max-w-lg"> {/* Adicionado max-w-lg para melhor visualização */}
          <CardHeader>
            <CardTitle>Meu Perfil</CardTitle>
              
            <CardDescription>Gerencie suas candidaturas e contribuições.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Título da seção (pode ser o "Visão Geral" ou "Meus Dados") */}
            <h4 className="text-lg font-semibold mb-2">Meus Dados</h4>

            <ProfileData />
            <hr className="mb-4" />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <strong>Quero Cadastrar um Pet para Adoção</strong>
                </AccordionTrigger>
                <AccordionContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
                      {/* Campo NOME */}
                      <FormField
                        control={form.control}
                        name="nome"
                        rules={{ required: "Especifique o nome do Pet." }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" placeholder="Nome do Pet" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Campo ESPÉCIE */}
                      <FormField
                        control={form.control}
                        name="especie"
                        rules={{ required: "Especifique a espécie do Pet." }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Espécie</FormLabel>
                            <FormControl>
                              
                              <Input {...field} type="text" placeholder="Gato, Cachorro, etc." /> 
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Campo DESCRIÇÃO */}
                      <FormField
                        control={form.control}
                        name="descricao"
                        rules={{ required: "Especifique uma descrição sobre o pet." }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              
                              <Textarea {...field} placeholder="Fale sobre a personalidade e necessidades do Pet..." /> 
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Campo IMAGEM (Upload de Arquivo) */}
                      <FormField
                        control={form.control}
                        name="imagem"
                        rules={{ required: "Por favor, adicione uma foto do Pet." }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Foto Principal do Pet</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                      
                                onChange={(e) => field.onChange(e.target.files)} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* BOTÃO DE SUBMIT DENTRO DO FORM */}
                      <Button disabled={loading} type="submit" className="w-full mt-4" style={{ backgroundColor: '#6773F1' }}>
                        {
                          loading ? (
                            <>
                              <SpinnerCustom />
                              <span>Cadastrando...</span>
                            </>
                          ) : (
                            <span>Cadastrar Pet</span>
                          )
                        }
                        
                      </Button>
                    </form>
                  </Form>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <strong>Pets Cadastrados</strong>
                </AccordionTrigger>
                <AccordionContent>

                </AccordionContent>
              </AccordionItem>
              
            </Accordion>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            {/* Rodapé da Card, pode ser usado para o botão Sair */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}