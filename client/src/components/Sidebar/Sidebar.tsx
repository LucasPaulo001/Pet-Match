import { Menu, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { IUser, useAuth } from "@/contexts/AuthContext";
import DropDown from "../DropDown/DropDown";


export default function Sidebar() {
  const { user, token } = useAuth();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription className="flex pt-7 items-center gap-5 text-[20px] flex-col">
            {
              token && user ? (
                <DropDown user={user} />
              ) : (
                 <Link href={"/login"}><Button>Conectar-se</Button></Link>
              )
            }
            <span><Link href={"/"}>Início</Link></span>
            <span>Cães</span>
            <span>Gatos</span>
            <span>Sobre nós</span>
            <span>Contato</span>
           
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
