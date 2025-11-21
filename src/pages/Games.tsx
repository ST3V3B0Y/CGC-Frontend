import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllGames, addToLibrary, removeFromLibrary, getUserLibrary } from "../services/gameService";
import type { Game } from "../services/gameService";
import { useAuth } from "../context/UseAuth";
import GameCard from "../components/GameCard";
import NavBar from "../components/NavBar";
import "../styles/Games.css";

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

        if (token) {
          const userLibrary = await getUserLibrary(token);
          setLibrary(userLibrary.map(g => g._id));
        }

      } catch (error) {
        console.error("Error cargando juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleAdd = async (id: string) => {
    if (!token) {
      alert("Debes iniciar sesión para agregar juegos.");
      navigate("/login");
      return;
    }

    const alreadyExist = library.includes(id);

    if (alreadyExist) {
      alert("Este juego ya está en tu biblioteca")
      return;
    }

    try {
      await addToLibrary(id, token);
      // Actualiza libreria local
      setLibrary((prev) => [...prev, id]);
      alert("Juego agregado a tu biblioteca")
    } catch {
      alert("Error al agregar el juego a tu biblioteca.");
    }
  };

  const handleRemove = async (id: string) => {
    if (!token) return alert("Debes iniciar sesión para eliminar juegos.");
    try {
      await removeFromLibrary(id, token);
      setLibrary(library.filter((gameId) => gameId !== id));
      alert("Juego eliminado de tu biblioteca")
    } catch {
      alert("Error al eliminar el juego de tu biblioteca.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mr-3"/>
        <p className="text-loading">Cargando juegos...</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar/>
      <div className="games-background min-h-screen text-white px-6 py-10">
          <h1 className="games-title">
            LO MEJOR EN VIDEOJUEGOS 🎮
          </h1>
    
          <div className="games-grid">
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
    </div>
  );
  
}
