"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Sidebar from "../Sidebar/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import DropDown from "../DropDown/DropDown";
import { SpinnerCustom } from "../ui/spinner";

export default function Navbar() {
  const { user, token, logout, loading } = useAuth();

  return (
    <div className="py-5 px-7 sticky top-0 bg-white left-0 z-40 right-0">
      <nav className="flex justify-around items-center">
        <div>
          <Link href={"/"}>
            <Image
              src={"/Logo.png"}
              alt="Logo do site"
              height={100}
              width={100}
            />
          </Link>
        </div>
        <div className="flex md:hidden">
          <Sidebar />
        </div>
        <div className="hidden md:flex items-center">
          <ul className="flex w-100 justify-around text-[#0372B1]">
            <li>
              <Link
                className="relative font-medium after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full text-[#0372B1]"
                href={"/"}
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                className="relative font-medium after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full text-[#0372B1]"
                href={"/dogs"}
              >
                Cães
              </Link>
            </li>
            <li>
              <Link
                className="relative font-medium after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full text-[#0372B1]"
                href={"/cats"}
              >
                Gatos
              </Link>
            </li>
            {/* <li>
              <Link
                className="relative font-medium after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full text-[#0372B1]"
                href={"#"}
              >
                Sobre nós
              </Link>
            </li>
            <li>
              <Link
                className="relative font-medium after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full text-[#0372B1]"
                href={"#"}
              >
                Contato
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="hidden md:flex">
          {loading ? (
            <SpinnerCustom />
          ) : token && user ? (
            <DropDown user={user} />
          ) : (
            <Link href={"/login"}>
              <Button className="bg-[#0372B1] cursor-pointer hover:bg-[#0a5581]">
                Conectar-se
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
