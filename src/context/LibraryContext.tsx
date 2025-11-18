import { createContext } from "react";
import type { Game } from "../services/gameService";

interface LibraryContextProps {
  library: Game[];
  loadingLibrary: boolean;
  addGame: (id: string) => Promise<void>;
  removeGame: (id: string) => Promise<void>;
}

export const LibraryContext = createContext<LibraryContextProps | null>(null);
