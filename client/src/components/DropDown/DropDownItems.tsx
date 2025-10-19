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

interface ItemsProps {
    nome: string;
}

export default function DropdownItems({ nome }: ItemsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-3 text-[#0372B1]">
        <Button 
            type="button"
            variant={"ghost"}
            className="cursor-pointer"
        >
          <HiDotsHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ferramentas - {nome}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Excluir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
