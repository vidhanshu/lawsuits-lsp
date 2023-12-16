"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

import { auth } from "@/src/firebase/firebase";
import FullScreenLoader from "@/src/common/components/FullScreenLoader";
import { routes } from "../utils/constants";
import AuthAPI from "@/src/auth/authAPI";

/**
 * If user is not logged in he will be redirected to the landing page
 */
export const AuthPrivateGaurd = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // authenticated
          const { data } = await AuthAPI.getUserById(user.uid);

          if (!data?.firstName) {
            // if not yet onboarded
            if (pathname !== routes.ONBOARDING_FORM_ROUTE) {
              return router.push(routes.ONBOARDING_FORM_ROUTE);
            }
          } else {

            if (data.status === "PENDING") {
              if (pathname !== routes.PROFILE_REVIEW) {
                return router.push(routes.PROFILE_REVIEW);
              }
            }
            // else if (pathname !== routes.HOME_ROUTE) {
            //   return router.push(routes.HOME_ROUTE);
            // }
          }
          setIsUserValid(true);
        } else {
          // un-authenticated
          router.push(routes.AUTH_SIGNIN_ROUTE);
        }
      });
    };

    checkAuth();
  }, []);

  console.log("[PRIVATE_AUTH_GAURD]", isUserValid);

  if (!isUserValid) {
    return <FullScreenLoader />;
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
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const { data } = await AuthAPI.getUserById(user.uid);
          if (!data?.firstName) {
            return router.push(routes.ONBOARDING_FORM_ROUTE);
          }
          router.push(routes.HOME_ROUTE);
        } else {
          setIsUserValid(true);
        }
      });
    };

    checkAuth();
  }, []);

  if (!isUserValid) {
    return <FullScreenLoader />;
  }

  return children;
};
