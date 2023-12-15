import { createContext } from "react";
import { NSAuthUser } from "@/src/auth/types";

export const UserContext = createContext<NSAuthUser.IUserContext | null>(null);
