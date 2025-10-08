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
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {

  const { login, loading } = useAuth();

  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  //Solicitando login
  const onSubmit = async (values: LoginFormValues) => {
    try{
      await login(values.email, values.password);
    }
    catch(error: any){
      const message =
        error.response?.data?.error || "Erro ao realizar cadastro.";
        toast(message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-evenly">
      <div className="relative w-full h-100 hidden md:flex">
        <SliderAuth />
      </div>
      <Form {...form}>
        <div className="flex items-center gap-3 border-s-4 w-full justify-evenly flex-col">
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
              name="email"
              rules={{ 
                required: "O E-mail é obrigatório.",
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
              name="password"
              rules={{ required: "A senha é obrigatória." }}
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
            <Button type="submit" className="w-full bg-[#0372B1] hover:bg-white hover:text-[#0372B1] cursor-pointer hover:border hover:border-[#0372B1]">
              Entrar
            </Button>
          </form>
          <span>
            Não tem uma conta?{" "}
            <Link
              className="text-blue-600 visited:text-purple-600"
              href={"/register"}
            >
              cliqe aqui
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
}
