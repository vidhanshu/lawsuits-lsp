'use client';

import { onAuthStateChanged } from 'firebase/auth';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import { UserContext } from './UserContext';
import { auth } from '@/src/firebase/firebase';
import { useRouter } from 'next/navigation';
import { NSAuthUser } from '@/src/auth/types';
import AuthAPI from '../../authAPI';

function UserContextProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [lsp, setLsp] = useState<NSAuthUser.ILspState | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { uid, displayName, email, photoURL, emailVerified } = user;
          const { error, message, data } = await AuthAPI.getUserById(uid);
          if (error) throw new Error(message);

          setLsp({ ...(data as NSAuthUser.TUser) });
        } else setLsp(null);
      } catch (error) {
        console.log('[CONNECTION_ERROR]', error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ lsp, setLsp, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
