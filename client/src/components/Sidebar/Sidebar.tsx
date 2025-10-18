"use client";

import { MenuIcon } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import DropDown from "../DropDown/DropDown";
import { useState } from "react";


export default function Sidebar() {
  const { user, token } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false); 
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Meu Perfil</SheetTitle>
          <SheetDescription className="flex pt-7 items-center gap-5 text-[20px] flex-col">
            {
              token && user ? (
                <DropDown user={user} />
              ) : (
                 <Link href={"/login"}><Button>Conectar-se</Button></Link>
              )
            }
            <span>
              <Link href={"/"} onClick={handleLinkClick}>
                Início
              </Link>
            </span>
            <span>
              <Link href={"/dogs"} onClick={handleLinkClick}>
                Cães
              </Link>
            </span>
            <span>
              <Link href={"/cats"} onClick={handleLinkClick}>
                Gatos
              </Link>
            </span>
            {/* <span>Sobre nós</span>
            <span>Contato</span> */}
           
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
