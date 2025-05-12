import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "../utils/apiRequest";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  // agrega más campos si los necesitas
}

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const data = await apiRequest("/api/v1/token/validate", "GET", token, undefined, { token });

      console.log("Token verification response:", data);

      if (data?.code === 200 && data.response) {
        setIsAuthenticated(true);
        setUser(data.response); // guarda los datos del usuario
      } else {
        setIsAuthenticated(false);
        setUser(null);
        await AsyncStorage.removeItem("token");
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
