import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllGames, addToLibrary, removeFromLibrary } from "../services/gameService";
import type { Game } from "../services/gameService";
import GameCard from "../components/GameCard";
import { useAuth } from "../context/UseAuth";
import NavBar from "../components/NavBar";

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [library, setLibrary] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allGames = await getAllGames();
        setGames(allGames);
      } catch (error) {
        console.error("Error cargando juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (id: string) => {
    if (!token) {
      alert("Debes iniciar sesión para agregar juegos.");
      navigate("/login");
      return;
    }
    try {
      await addToLibrary(id, token);
      setLibrary((prev) => [...prev, id]);
    } catch {
      alert("Error al agregar el juego a tu biblioteca.");
    }
  };

  const handleRemove = async (id: string) => {
    if (!token) return alert("Debes iniciar sesión para eliminar juegos.");
    try {
      await removeFromLibrary(id, token);
      setLibrary(library.filter((gameId) => gameId !== id));
    } catch {
      alert("Error al eliminar el juego de tu biblioteca.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mr-3"></div>
        Cargando juegos...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-6 py-10">
      <NavBar />
      <h1 className="text-3xl font-bold text-center mb-8">
        Catálogo de Juegos 🎮
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard
            key={game._id}
            game={game}
            inLibrary={library.includes(game._id)}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
