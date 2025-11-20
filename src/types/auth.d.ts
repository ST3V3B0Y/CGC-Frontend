export interface User {
    id: string;
    nombre: string;
    correo: string;
    rol: "usuario" | "admin";
  }
  
  export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (correo: string, contraseña: string) => Promise<void>;
    register: (nombre: string, correo: string, contraseña: string) => Promise<void>;
    logout: () => void;
  }