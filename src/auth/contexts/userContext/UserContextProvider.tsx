"use client";

import { onAuthStateChanged } from "firebase/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";

import AuthAPI from "@/src/auth/authAPI";
import { UserContext } from "./UserContext";
import { NSAuthUser } from "@/src/auth/types";
import { auth } from "@/src/firebase/firebase";

function UserContextProvider({ children }: PropsWithChildren) {
  const [lsp, setLsp] = useState<NSAuthUser.TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { uid, emailVerified } = user;
          const { error, message, data } = await AuthAPI.getUserById(uid);
          if (error) throw new Error(message);

          console.log("[LSP_DATA_FROM_USER_CONTEXT]", data);
          setLsp({ ...(data as NSAuthUser.TUser), emailVerified });
        } else {
          setLsp(null);
        }
      } catch (error) {
        console.log("[CONNECTION_ERROR]", error);
      } finally {
        setIsLoading(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ lsp, setLsp, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
