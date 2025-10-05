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

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log("Login data:", values);
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-80 mx-auto mt-10"
          >
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Senha" />
                  </FormControl>
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
