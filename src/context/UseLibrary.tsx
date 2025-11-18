import { useContext } from "react";
import { LibraryContext } from "./LibraryContext";

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);

  if (!ctx) {
    throw new Error("useLibrary debe usarse dentro del LibraryProvider");
  }

  return ctx;
};
