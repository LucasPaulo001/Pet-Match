// ListPets.tsx (Refatorado)

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; 
import DialogWindow from "../Dialog/Dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

// Tipagem básica para um Pet
interface Pet {
  _id: string;
  nome: string;
  especie: string;
  descricao: string;
  responsavel: any;
  imagem: string;
}

export default function ListPets() {
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


  if (isLoading) {
    return (
      <section className="w-full">
        <h2 className="text-xl mb-3">Meus Pets</h2>
        <div className="flex gap-4 p-1 overflow-x-auto pb-4">
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

  return(
   <section className="w-full p-10">
      <h2 className="text-2xl font-bold text-[#0372B1]">Conheça seu futuro(a) amigo(a):</h2>
      <div className="flex gap-8 p-10 overflow-x-auto">
        {pets.length === 0 ? (
          <span className="text-[20px] p-0">
            <Alert>
              <AlertCircleIcon />
              <AlertTitle>Não tem nenhum Pet cadastrado ainda...</AlertTitle>
              <AlertDescription>Ajude um Pet a ganhar um lar!</AlertDescription>
            </Alert>
          </span>
        ) : (
          pets.map((pet) => (
            <div key={pet._id} className="flex-none w-48 flex flex-col gap-3 border border-gray-200 text-center rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <img src={pet.imagem} alt={pet.nome} className="w-full h-32 object-cover rounded-md" />
                <h3 className="text-sm font-semibold mt-2 truncate">{pet.nome}</h3>
              </div>

              <DialogWindow nome={pet.nome} responsavel={pet.responsavel} descricao={pet.descricao} especie={pet.especie} imagem={pet.imagem} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}