// ListPets.tsx (Refatorado)

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import SliderPets from "../Slider/SliderPets";

// Tipagem básica para um Pet
export interface Pet {
  _id: string;
  nome: string;
  especie: string;
  descricao: string;
  responsavel: any;
  imagem: string;
}

interface ListProps {
  valueDogs: boolean;
  valueCats: boolean;
}

export default function ListPets({ valueDogs, valueCats }: ListProps) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { listPets } = useAuth();

  useEffect(() => {
    const handleList = async () => {
      setIsLoading(true);
      try {
        const result = await listPets();

        const petList = result.pets;
        console.log(petList)

        setPets(petList || []);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
        setPets([]);
      } finally {
        setIsLoading(false);
      }
    };

    handleList();
  }, [listPets]);

  const dogs = pets.filter((p) => p.especie.toLocaleLowerCase() === "cachorro");
  const cats = pets.filter((p) => p.especie.toLocaleLowerCase() === "gato");


  return(
   <section className="w-full p-10">
    {
      valueDogs && (
        <SliderPets pets={dogs} titulo={"Cães"} isLoading={isLoading} />
      )
    }
    {
      valueCats && (
        <SliderPets pets={cats} titulo={"Gatos"} isLoading={isLoading} />
      )
    }
      
    </section> 
  );
}