import { createContext } from "react";
import type { AuthContextType } from "../types/auth";

const authContext = createContext<AuthContextType | undefined>(undefined);

export default authContext;