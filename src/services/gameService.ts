import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface Game {
  _id: string;
  titulo: string;
  categoria: string;
  plataforma: string;
  añoLanzamiento: number;
  desarrollador: string;
  imagenPortada?: string;
  descripcion?: string;
  completado?: boolean;
}

export const getAllGames = async (): Promise<Game[]> => {
  const res = await axios.get(`${API_URL}/games`);
  return res.data;
};

export const addToLibrary = async (gameId: string, token: string) => {
  const res = await axios.post(
    `${API_URL}/library/add/`,
    { gameId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const removeFromLibrary = async (gameId: string, token: string) => {
  const res = await axios.delete(`${API_URL}/library/remove/${gameId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
