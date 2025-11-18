import React from "react";
import type { Game } from "../services/gameService";

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
    <div className="border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col text-center">
      <img
        src={game.imagenPortada || "/default-cover.jpg"}
        alt={game.titulo}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <h3 className="text-lg font-bold text-white mb-1">{game.titulo}</h3>
      <p className="text-gray-400 text-sm mb-2">{game.categoria}</p>

      <p className="text-gray-300 text-sm mb-2">
        <span className="font-semibold text-gray-400">Plataforma:</span>{" "}
        {game.plataforma}
      </p>

      <p className="text-gray-300 text-sm mb-2">
        <span className="font-semibold text-gray-400">Año:</span>{" "}
        {game.añoLanzamiento}
      </p>

      <p className="text-gray-300 text-sm mb-3">
        <span className="font-semibold text-gray-400">Desarrollador:</span>{" "}
        {game.desarrollador}
      </p>

      {game.descripcion && (
        <p className="text-gray-400 text-xs mb-4 line-clamp-3">
          {game.descripcion}
        </p>
      )}

      {inLibrary ? (
        <button
          onClick={() => onRemove?.(game._id)}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full"
        >
          Eliminar de Biblioteca
        </button>
      ) : (
        <button
          onClick={() => onAdd?.(game._id)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
        >
          Agregar a Biblioteca
        </button>
      )}
    </div>
  );
}
