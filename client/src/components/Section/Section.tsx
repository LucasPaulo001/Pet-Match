import { Heart, House, Search } from "lucide-react";

export default function Section() {
  return (
    <div className="p-10 flex gap-5 flex-col">
      <h2 className="text-2xl font-bold text-[#0372B1]">Como funciona?</h2>
      <div className="flex flex-row overflow-y-auto md:flex-row p-2 h-50 items-center gap-5 justify-around cursor-pointer">
        <div className="border text-center w-[100%] md:w-[50%] hover:border-[#80d0ff] transition flex items-center flex-col h-full rounded-2xl shadow-md md:p-2 p-4 gap-3.5">
          <Search color="#0372B1" className="bg-[#ebf8ff] p-0 rounded-[100%] md:p-3" size={70} />

          <h2 className="font-bold text-[20px]">Explore</h2>
          <span>Perfis de Pets</span>
        </div>
        <div className="border text-center w-[100%] md:w-[50%] hover:border-[#80d0ff] transition flex items-center flex-col h-full rounded-2xl shadow-md md:p-2 p-4 gap-3.5">
          <Heart color="#0372B1" className="bg-[#ebf8ff] md:p-3 rounded-[100%] p-0" size={70} />

          <h2 className="font-bold text-[20px]">Conheça</h2>
          <span>Agende uma visita</span>
        </div>
        <div className="border text-center w-[100%] md:w-[50%] hover:border-[#80d0ff] transition flex items-center flex-col h-full rounded-2xl shadow-md md:p-2 p-4 gap-3.5">
          <House color="#0372B1" className="bg-[#ebf8ff] md:p-3 rounded-[100%] p-0" size={70} />

          <h2 className="font-bold text-[20px]">Adote</h2>
          <span>Dê um lar feliz!</span>
        </div>

      </div>
    </div>
  );
}
