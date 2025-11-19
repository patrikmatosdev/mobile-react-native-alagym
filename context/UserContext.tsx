import { getUser } from "@/api/users";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Alert } from "react-native";

export interface User {
  id?: number,
  name: string,
  type: string,
  email: string,
  city: string,
  country: string,
  phone: string,
  document: string,
  address: string,
}

interface UserContextProps {
  user: User;
  login: (doc: string) => void;
  logout: () => void;
  isLoading: boolean;
  isLogged: boolean;
}

interface ProviderProps {
  children: ReactNode;
}

const initialValue = {
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
  document: "",
  phone: "",
  type: "",
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: ProviderProps) {
  const [isLoading, setIsloading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User>(initialValue);

  const login = async (document: string) => {
    setIsloading(true);

    try {
      const response = await getUser(document);
      
      setUser(response.data);
      setIsLogged(true);
    } catch (error) {
      Alert.alert("Erro", "Não foí possivel entrar na sua conta.")
    } finally {
      setIsloading(false)
    }
  }

  const logout = () => {
    setUser(initialValue);
    setIsLogged(false);
    setIsloading(false);
  }

  return (
    <UserContext.Provider value={{ user, isLoading, isLogged, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
