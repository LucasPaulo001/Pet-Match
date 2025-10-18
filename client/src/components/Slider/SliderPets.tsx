"use client";

import { Skeleton } from "@/components/ui/skeleton";
import DialogWindow from "../Dialog/Dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

interface Pet {
  _id: string;
  nome: string;
  especie: string;
  descricao: string;
  responsavel: any;
  imagem: string;
}

interface SliderPetsProps {
  pets: Pet[];
  titulo?: string;
  isLoading?: boolean;
}

export default function SliderPets({ pets, titulo, isLoading }: SliderPetsProps) {


  if (isLoading) {
    return (
      <section className="w-full p-4">
        <h2 className="text-xl mb-3">Meus Pets</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex-none w-48 p-3">
              <Skeleton className="w-full h-32 rounded-md mb-2" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full p-4 md:p-8 lg:p-10">
      <h2 className="text-[18px] font-bold text-[#0372B1] mb-6">
        Conheça seu futuro(a) amigo(a) - {titulo}:
      </h2>

      {pets.length === 0 ? (
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>Não tem nenhum Pet cadastrado ainda...</AlertTitle>
          <AlertDescription>Ajude um Pet a ganhar um lar!</AlertDescription>
        </Alert>
      ) : (
        <Carousel>
          <CarouselContent className="gap-4">
            {pets.map((pet) => (
              <CarouselItem
                key={pet._id}
                className="flex-auto min-w-[180px] max-w-[250px]"
              >
                <div className="p-1">
                  <Card className="flex flex-col gap-2 text-center shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-3 flex flex-col gap-2">
                      <img
                        src={pet.imagem}
                        alt={pet.nome}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <h3 className="text-sm font-semibold truncate">
                        {pet.nome}
                      </h3>
                      <DialogWindow
                        nome={pet.nome}
                        responsavel={pet.responsavel}
                        descricao={pet.descricao}
                        especie={pet.especie}
                        imagem={pet.imagem}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </section>
  );
}
