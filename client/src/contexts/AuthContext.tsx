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
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

//Provider com as funções necessárias
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  //Recuperando usuário do localstorage
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) setUser(JSON.parse(userStorage));
    setLoading(false);
  }, []);

  //Função para fazer o login do usuário
  const login = async (email: string, senha: string) => {
    try {
      const { data } = await axios.post(
        "https://pet-match-wyjx.onrender.com/api/users/login",
        { email, senha }
      );
      setUser(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));


    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  //Função de registro de usuário
  const register = async (nome: string, email: string, senha: string) => {
    try{
        await axios.post("https://pet-match-wyjx.onrender.com/api/users/register", 
            { nome, email, senha }
        );

    }
    catch(error){
        console.log("Erro no registro:", error);
    }
  }

  //Função de logout
  function logout() {
    setUser(null);
    localStorage.removeItem("user");

  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
