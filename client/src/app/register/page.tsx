"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import SliderAuth from "@/components/SliderAuth/SliderAuth";
import { useAuth } from "@/contexts/AuthContext";
import { SpinnerCustom } from "@/components/ui/spinner";
import { toast } from "sonner";

type LoginFormValues = {
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
};

export default function Register() {
  const { register, loading } = useAuth();

  const form = useForm<LoginFormValues>({
    defaultValues: { nome: "", email: "", senha: "", confirmSenha: "" },
  });
  
  const onSubmit = async (values: LoginFormValues) => {
    if (values.senha != values.confirmSenha) {
      form.setError("confirmSenha", {
        type: "manual",
        message: "As senhas não são iguais!",
      });
      return;
    }
    try{
      await register(values.nome, values.email, values.senha);
    }
    catch(error: any){
      const message =
        error.response?.data?.error || "Erro ao realizar cadastro.";
        toast(message);
    }
    
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
          <span className="text-[#0372B1] flex md:hidden">
            Encontre seu melhor amigo, adote amor.
          </span>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-80 mx-auto mt-10"
          >
            <FormField
              control={form.control}
              name="nome"
              rules={{ required: "O nome é obrigatório." }}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "O email é obrigatório.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido.",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="seu@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              rules={{
                required: "A senha é obrigatória.",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres.",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Senha" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmSenha"
              rules={{
                required: "A confirmação de senha é obrigatória.",
              }}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-[#0372B1] hover:bg-white hover:text-[#0372B1] cursor-pointer hover:border hover:border-[#0372B1]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <SpinnerCustom />
                  <span>Registrando...</span>
                </div>
              ) : (
                <span>Criar conta</span>
              )}
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
