import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./UseAuth";
import { addToLibrary, removeFromLibrary } from "../services/gameService";
import { LibraryContext } from "./LibraryContext";
import type { Game } from "../services/gameService";

export const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuth();
  const [library, setLibrary] = useState<Game[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!token) {
        setLibrary([]);
        setLoadingLibrary(false);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/library`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLibrary(res.data.games || []);
      } catch (err) {
        console.error("Error cargando biblioteca:", err);
      } finally {
        setLoadingLibrary(false);
      }
    };

    fetchLibrary();
  }, [token, user]);

  const addGame = async (id: string) => {
    if (!token) return;

    try {
      await addToLibrary(id, token);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/games/${id}`
      );

      setLibrary((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error agregando juego:", err);
    }
  };

  const removeGame = async (id: string) => {
    if (!token) return;

    try {
      await removeFromLibrary(id, token);
      setLibrary((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error("Error eliminando juego:", err);
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        library,
        loadingLibrary,
        addGame,
        removeGame,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
