import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loginUser, registerUser } from "../services/authService";
import authContext from "./AuthContext";
import axios from "axios";
import type { User } from "../types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (correo: string, contraseña: string) => {
    try {
      const data = await loginUser(correo, contraseña);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error al iniciar sesión");
      }
      throw new Error("Error desconocido al iniciar sesión");
    }
  };

  const register = async (nombre: string, correo: string, contraseña: string) => {
    try {
      const data = await registerUser(nombre, correo, contraseña);

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error al registrarse");
      }
      throw new Error("Error desconocido al registrarse");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <authContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </authContext.Provider>
  );
};