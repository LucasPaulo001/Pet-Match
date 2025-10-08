"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";


//Interface do usuário
interface IUser {
  id: string;
  nome: string;
  email: string;
}

//Interface do contexto
interface IAuthContextProps {
  user: IUser | null;
  token: string | null
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

//Provider com as funções necessárias
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  //Recuperando usuário do localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token){
      setToken(token);
      getProfile();
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

    }
    catch (error) {
      console.error("Erro no login:", error);
    }
    finally{
      setLoading(false);
    }
  };

  //Função para pegar dados do perfil do usuário
  const getProfile = async () => {
    if(!token) return;

    try{
      const { data } = await axios.get(
        "https://pet-match-wyjx.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data);
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
        const res = await axios.post("https://pet-match-wyjx.onrender.com/api/users/register", 
          { nome, email, senha }
        );

    }
    catch(error){
        throw error;
    }
    finally{
      setLoading(false)
    }
  }

  //Função de logout
  function logout() {
    setUser(null);
    localStorage.removeItem("user");

  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
