import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "@/contexts/AuthContext";
import { SpinnerCustom } from "../ui/spinner";

interface ItemsProps {
  nome: string;
  petId: string;
}

export default function DropdownItems({ nome, petId }: ItemsProps) {
  const { deletePets, loading } = useAuth();

  const handleDelete = async (petId: string) => {
    await deletePets(petId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-3 text-[#0372B1] p-2 cursor-pointer">
        <HiDotsHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ferramentas - {nome}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDelete(petId)}>
          {loading ? (
            <span className="flex gap-1.5 justify-center">
              <SpinnerCustom />
              Excluindo...
            </span>
          ) : (
            <span>Excluir</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
