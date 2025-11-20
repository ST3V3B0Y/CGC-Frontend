import axios from "axios";
// import type { Game } from "./gameService";

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

// Traer todos los juegos
export const getAllGames = async (): Promise<Game[]> => {
  const res = await axios.get(`${API_URL}/games`);
  return res.data;
};

// Traer un juego por ID
export const getGameById = async (gameId: string): Promise<Game> => {
  const res = await axios.get(`${API_URL}/games/${gameId}`);
  return res.data;
};

// Traer juegos por categoría
export const getGamesByCategory = async (
  category: string
): Promise<Game[]> => {
  const res = await axios.get(`${API_URL}/games/category/${category}`);
  return res.data;
};

// Traer juegos por plataforma
export const getGamesByPlatform = async (
  platform: string
): Promise<Game[]> => {
  const res = await axios.get(`${API_URL}/games/platform/${platform}`);
  return res.data;
};

// Biblioteca de juegos del usuario
export const getUserLibrary = async (token: string): Promise<Game[]> => {
  const res = await axios.get(`${API_URL}/library`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Agregar juego a la biblioteca del usuario
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

// Eliminar juego de la biblioteca del usuario
export const removeFromLibrary = async (gameId: string, token: string) => {
  const res = await axios.delete(`${API_URL}/library/remove/${gameId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
