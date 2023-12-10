'use client';

import { onAuthStateChanged } from 'firebase/auth';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import { UserContext } from './UserContext';
import { auth } from '@/src/firebase/firebase';
import { useRouter } from 'next/navigation';
import { NSAuthUser } from '@/src/auth/types';

function UserContextProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [user, setUser] = useState<NSAuthUser.IUserState>({ email: null });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email });
        setIsLoggedIn(true);
      } else {
        setUser({ email: null });
        setIsLoggedIn(false);
        router.push('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
