"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import SliderAuth from "@/components/SliderAuth/SliderAuth";
import { useAuth } from "@/contexts/AuthContext";

type LoginFormValues = {
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
};

export default function Register() {
  const { register } = useAuth();

  const form = useForm<LoginFormValues>({
    defaultValues: { nome: "", email: "", senha: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if(values.senha != values.confirmSenha){
      return alert("As senhas não são iguais!");
    };

    await register(values.nome, values.email, values.senha);

    alert("Cadastro realizado com sucesso!");

  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-full h-100 hidden md:flex">
        <SliderAuth />
      </div>
      <Form {...form}>
        <div className="flex items-center border-s-4 justify-center gap-3 w-full flex-col">
          <div>
            <Image src={"/Logo.png"} alt="Logo" width={150} height={90} />
          </div>
          <span className="text-[#0372B1] flex md:hidden">Encontre seu melhor amigo, adote amor.</span>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-80 mx-auto mt-10"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nome de usuário"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="seu@email.com" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Senha" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repita sua senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Repita a senha"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#0372B1] hover:bg-white hover:text-[#0372B1] cursor-pointer hover:border hover:border-[#0372B1]"
            >
              Criar conta
            </Button>
          </form>
          <span>
            Já tem uma conta?{" "}
            <Link
              className="text-blue-600 visited:text-purple-600"
              href={"/login"}
            >
              cliqe aqui
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
}
