import { Menu, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Olá!</SheetTitle>
          <SheetDescription className="flex pt-7 items-center gap-10 text-[20px] flex-col">
            <span>Início</span>
            <span>Cães</span>
            <span>Gatos</span>
            <span>Sobre nós</span>
            <span>Contato</span>
            <Link href={"/login"}><Button>Conectar-se</Button></Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
