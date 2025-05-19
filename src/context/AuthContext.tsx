import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "../utils/apiRequest";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean; // <-- Añadido
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // <-- Añadido

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          const data = await apiRequest("/api/v1/token/validate", "GET", token, undefined, { token });

          if (data?.code === 200 && data.response) {
            setIsAuthenticated(true);
            setUser(data.response);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            await AsyncStorage.removeItem("token");
          }
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false); // <-- Finaliza la carga
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        isLoading, // <-- Incluido en el contexto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
