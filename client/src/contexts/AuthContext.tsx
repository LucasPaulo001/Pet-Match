"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


//Interface do usuário
export interface IUser {
  id: string;
  nome: string;
  email: string;
  tipo: string;
}

//Interface do contexto
interface IAuthContextProps {
  user: IUser | null;
  token: string | null
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  registerPet: (nome: string, especie: string, descricao: string, imagem: FileList) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

//Provider com as funções necessárias
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //Recuperando usuário do localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token){
      setToken(token);
      getProfile(token);
    }
    setLoading(false);
  }, []);

  //Função para fazer o login do usuário
  const login = async (email: string, senha: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://pet-match-wyjx.onrender.com/api/users/login",
        { email, senha }
      );
      setUser(data.user);

      //Salvando token no localstorage
      localStorage.setItem("token", data.token);
      setToken(data.token);

      await getProfile(data.token);

      router.push("/");

    }
    catch (error) {
      console.error("Erro no login:", error);
    }
    finally{
      setLoading(false);
    }
  };

  //Função para pegar dados do perfil do usuário
  const getProfile = async (authToken?: string) => {
    const activeToken = authToken || token;
    if (!activeToken) return;

    try{
      const { data } = await axios.get(
        "https://pet-match-wyjx.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        }
      );
      setUser(data);
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data));
    }
    catch(error){
      console.error("Erro ao buscar perfil:", error);
      logout(); 
    }
  }

  //Função de registro de usuário
  const register = async (nome: string, email: string, senha: string) => {
    setLoading(true);
    try{
        await axios.post("https://pet-match-wyjx.onrender.com/api/users/register", 
          { nome, email, senha }
        );

        router.push("/login");
    }
    catch(error){
        throw error;
    }
    finally{
      setLoading(false)
    }
  }

  //Função de logout
  const logout = () =>  {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

  }

  //Cadastrar Pet
  const registerPet = async (nome: string, especie: string, descricao: string, imagem: FileList) => {
    try{
      setLoading(true);
      const formData = new FormData();

      formData.append("nome", nome);
      formData.append("especie", especie);
      formData.append("descricao", descricao);
      formData.append("imagem", imagem[0]);

      await axios.post("https://pet-match-wyjx.onrender.com/api/users/register-pet",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        })

    }
    catch(error: any){
      throw error;
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, registerPet, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
