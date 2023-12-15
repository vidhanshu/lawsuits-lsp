"use client";

import React from "react";
import Link from "next/link";

import AuthAPI from "@/src/auth/authAPI";
import { Button } from "@/components/ui/button";
import { DUMMY_AVATAR_IMG } from "@/src/auth/utils/constants";
import LogoWithName from "@/src/common/components/LogoWithName";
import useUserContext from "@/src/auth/contexts/userContext/useUserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import { stringShortener } from "@/src/common/utils/helpers";
import Container from "../Container";
import { routes } from "../../utils/constants";

const Navbar = () => {
  const { lsp, isLoading } = useUserContext();

  console.log(lsp);

  const handleSignOut = async () => {
    const { message, error } = await AuthAPI.signOut();
    if (error) {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: message,
        variant: "success",
      });
    }
  };

  return (
    <header className="py-2 border-b sticky top-0 bg-white z-10">
      <Container className="flex justify-between items-center">
        <LogoWithName />
        <ul className="md:gap-x-6 items-center hidden md:flex">
          <NavLinks />
        </ul>
        <div className="flex gap-x-4 items-center">
          {isLoading ? (
            <Skeleton className="w-8 h-8 md:rounded-full  md:w-28 md:h-10" />
          ) : lsp?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-0 md:px-1 flex items-center"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        !!lsp?.profilePic ? lsp.profilePic : DUMMY_AVATAR_IMG
                      }
                    />
                    <AvatarFallback>{lsp?.email?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">
                    {stringShortener(
                      lsp?.firstName ? lsp.firstName : lsp.email,
                      10,
                    )}
                    ...
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={routes.HOME_ROUTE} className="w-full h-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={routes.HOME_ROUTE} className="w-full h-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={routes.HOME_ROUTE} className="w-full h-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={routes.HOME_ROUTE} className="w-full h-full">
                    Chat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full h-full">
                  <button onClick={handleSignOut} className="text-red-500">
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={routes.AUTH_SIGNIN_ROUTE}>
              <Button size="sm" className="mr-2 rounded-full">
                Get Started
              </Button>
            </Link>
          )}

          <MobileNav />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
