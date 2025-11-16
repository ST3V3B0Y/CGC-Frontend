import axiosClient from "./axiosClient";

interface LoginData {
    correo:string;
    contraseña:string;
}

interface RegisterData {
    nombre: string;
    correo: string;
    contraseña: string;
}

export const authService = {
    async login(data: LoginData) {
        const response = await axiosClient.post("/auth/login", data);
        return response.data;
    },

    async register(data: RegisterData) {
        const response = await axiosClient.post("/auth/register", data);
        return response.data;
    },
};