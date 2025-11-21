import type { Game } from "../services/gameService";
import "../styles/GameCard.css";

interface GameCardProps {
  game: Game;
  inLibrary?: boolean;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function GameCard({
  game,
  inLibrary,
  onAdd,
  onRemove,
}: GameCardProps) {
  return (
    <div className="game-card">
      {/* Imagen del juego */}
      <img
        src={game.imagenPortada || "https://i.ytimg.com/vi/xyz123/hqdefault.jpg"}
        alt={game.titulo}
        className="game-card-image"
      />

      {/* Capa con información (solo visible al hacer hover) */}
      <div className="game-card-overlay">
        <h3 className="game-card-title">{game.titulo}</h3>
        <p className="game-card-text">
          <span className="game-card-label">Categoría:</span> {game.categoria}
        </p>

        <p className="game-card-text">
          <span className="game-card-label">Plataforma:</span> {game.plataforma}
        </p>

        <p className="game-card-text">
          <span className="game-card-label">Año:</span> {game.añoLanzamiento}
        </p>

        <p className="game-card-text">
          <span className="game-card-label">Desarrollador:</span> {game.desarrollador}
        </p>

        {game.descripcion && (
          <p className="game-card-description">{game.descripcion}</p>
        )}

        {/* Botón de agregar / remover */}
        {inLibrary ? (
          <button
            onClick={() => onRemove?.(game._id)}
            className="game-card-btn remove"
          >
            Eliminar de Biblioteca
          </button>
        ) : (
          <button
            onClick={() => onAdd?.(game._id)}
            className="game-card-btn add"
          >
            Agregar a la Biblioteca
          </button>
        )}

        <button className="game-card-btn review">Reseñas</button>
      </div>
    </div>
  );
}
