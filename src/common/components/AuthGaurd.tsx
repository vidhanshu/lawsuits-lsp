'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

import { auth } from '@/src/firebase/firebase';
import FullScreenLoader from '@/src/common/components/FullScreenLoader';

/**
 * If user is not logged in he will be redirected to the landing page
 */
export const AuthPrivateGaurd = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
          router.push('/onboarding-form')
        } else {
          router.push('/');
        }
      });
    };

    checkAuth();
  }, []);

  if (!isUserValid) {
    return <FullScreenLoader />
  }

  return children;
};

/**
 * If user is loggedin he will be redirected to the home page
 */
export const AuthPublicGaurd = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          router.push('/home');
        } else {
          setIsUserValid(true);
        }
      });
    };

    checkAuth();
  }, []);

  if (!isUserValid) {
    return <FullScreenLoader />
  }

  return children;
}