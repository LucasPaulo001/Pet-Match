import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "../ui/separator";
import EditWindow from "../Dialog/EditUser";

export default function ProfileData() {
  const { user } = useAuth();
  return (
    <div className="border-1 rounded-[1vw] p-3 border-indigo-400 border-solid">
      <ul className="flex flex-col gap-1.5">
        <li>
          <strong>Nome:</strong> {user?.nome}
        </li>
        <li>
          <strong>Tipo:</strong> {user?.tipo}
        </li>
        <Separator />
        <li>
          <strong>Rua:</strong>{" "}
          {!user?.endereco?.rua ? (
            <span className="text-red-500">Campo vazio</span>
          ) : (
            user?.endereco.rua
          )}
        </li>
        <li>
          <strong>Numero:</strong>{" "}
          {!user?.endereco?.numero ? (
            <span className="text-red-500">Campo vazio</span>
          ) : (
            user?.endereco.numero
          )}
        </li>
        <li>
          <strong>Bairro:</strong>{" "}
          {!user?.endereco?.bairro ? (
            <span className="text-red-500">Campo vazio</span>
          ) : (
            user?.endereco.bairro
          )}
        </li>

        <li>
          <strong>Cidade:</strong>{" "}
          {!user?.endereco?.cidade ? (
            <span className="text-red-500">Campo vazio</span>
          ) : (
            user?.endereco.cidade
          )}
        </li>
        <li>
          <strong>Estado:</strong>{" "}
          {!user?.endereco?.estado ? (
            <span className="text-red-500">Campo vazio</span>
          ) : (
            user?.endereco.estado
          )}
        </li>
      </ul>
      <div className="w-full flex items-end justify-end">
        <EditWindow nome={user?.nome} endereco={user?.endereco} tipo={user?.tipo}  />
      </div>
    </div>
  );
}
