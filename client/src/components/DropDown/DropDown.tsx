import { IUser, useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";

interface Props {
  user: IUser;
}

export default function DropDown({ user }: Props) {
  const { logout, loading } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-3 text-[#0372B1]">
        <User />
        Olá {user.nome}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem>Perfil</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>FeedBack</DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center">
          <Button
            onClick={() => logout()}
            className="bg-red-400 hover:bg-red-500 w-full"
          >
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
