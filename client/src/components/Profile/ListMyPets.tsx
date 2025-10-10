"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { SpinnerCustom } from "../ui/spinner";

export default function ListMyPets() {
  const [myPets, setMyPets] = useState<any[]>([]);
  const { listMyPets, loading } = useAuth();

  useEffect(() => {
    const handleList = async () => {
      try {
        const { pets } = await listMyPets();
        setMyPets(pets || []);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };

    handleList();
  }, []);

  return (
    <section>
      <h2 className="text-xl mb-3">Meus Pets</h2>
      {loading ? (
        <span className="flex gap-2">
          <SpinnerCustom />
          <span className="text-indigo-500 italic">Carregando...</span>
        </span>
      ) : (
        <div className="flex gap-4 p-1 overflow-x-auto pb-4">
          {myPets.map((pet) => (
            <div
              key={pet._id}
              className="flex-none w-48 border border-gray-200 text-center rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={pet.imagem}
                alt={pet.nome}
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="text-sm font-semibold mt-2 truncate">
                {pet.nome}
              </h3>
            </div>
          ))}
          {myPets.length === 0 && (
            <p className="text-gray-500 w-full text-center py-4">
              Nenhum pet encontrado.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
