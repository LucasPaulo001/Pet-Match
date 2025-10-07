import { Heart, House, Search } from "lucide-react";

export default function Section() {
  return (
    <div className="p-10 flex gap-5 flex-col">
      <h2 className="text-2xl font-bold text-[#0372B1]">Como funciona?</h2>
      <div className="flex flex-col items-center md:flex-row gap-10 justify-around cursor-pointer">
        <div className="border w-[100%] md:w-[50%] hover:border-[#80d0ff] transition flex items-center flex-col rounded-2xl shadow-md p-9 gap-3.5">
          <Search color="#0372B1" className="bg-[#ebf8ff] rounded-[100%] p-3" size={70} />

          <h2 className="font-bold text-[20px]">Explore</h2>
          <span>Navegue por perfis de Pets</span>
        </div>
        <div className="border w-[100%] md:w-[50%] hover:border-[#80d0ff] transition flex items-center flex-col rounded-2xl shadow-md p-9 gap-3.5">
          <Heart color="#0372B1" className="bg-[#ebf8ff] rounded-[100%] p-3" size={70} />

          <h2 className="font-bold text-[20px]">Conheça</h2>
          <span>Agende uma visita</span>
        </div>
        <div className="border w-[100%] md:w-[50%] hover:border-[#80d0ff] transition flex items-center flex-col rounded-2xl shadow-md p-9 gap-3.5">
          <House color="#0372B1" className="bg-[#ebf8ff] rounded-[100%] p-3" size={70} />

          <h2 className="font-bold text-[20px]">Adote</h2>
          <span>Dê um lar feliz!</span>
        </div>

      </div>
    </div>
  );
}
