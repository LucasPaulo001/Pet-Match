'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SliderAuth() {
  const [image, setImage] = useState(0);
  
  const images = ["/Image.png", "/Image02.png", "/Image03.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col items-center w-full">
      <span className="text-2xl font-serif text-[#0372B1]">
        Encontre seu melhor amigo, adote amor.
      </span>
      {images.map((src, idx) => (
         
            <Image
              key={idx}
              src={src}
              alt="Imagem do cachorro"
              width={350}
              height={350}
              className={`absolute rounded-lg transition-opacity duration-1000 ease-in-out
                ${idx === image ? "opacity-100" : "opacity-0"}`}
            />
          
        ))}
    </div>
  );
}
