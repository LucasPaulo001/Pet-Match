
import Image from "next/image";

export default function Footer(){
    return(
        <div>
            <footer className="bg-[#525CC1] px-5 py-7 flex justify-center items-center flex-col">
                <div>
                    <Image src={"/LogoWhite.png"} alt="Logo do site" width={150} height={150} />
                </div>
                <span className="text-white"><h3>&copy; Lucas Paulo</h3></span>
            </footer>
        </div>
    )
}