import { useAuth } from "@/contexts/AuthContext"

export default function ProfileData(){
    const { user } = useAuth();
    return(
        <div className="border-1 rounded-[1vw] p-3 border-indigo-400 border-solid">
            <ul className="flex flex-col gap-1.5">
                <li><strong>Nome:</strong> {user?.nome}</li>
                <li><strong>Tipo:</strong> {user?.tipo}</li>
            </ul>
        </div>
    )
}