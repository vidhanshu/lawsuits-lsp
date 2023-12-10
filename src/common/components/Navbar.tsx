'use client';

import React from 'react';
import Link from 'next/link';
import { CircleUser, LogIn, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

import LogoWithName from './LogoWithName';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useUserContext from '@/src/auth/contexts/userContext/useUserContext';
import { DUMMY_AVATAR_IMG } from '@/src/auth/utils/constants';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const pathname = usePathname();
  const { isLoggedIn, user } = useUserContext();

  return (
    <header className="px-8 py-2 border-b">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <LogoWithName />
        <div className="flex items-center gap-x-8">
          <ul className="flex md:gap-x-6 items-center">
            <li
              className={cn(
                'hover:text-blue-500 transition-colors',
                pathname.includes(isLoggedIn ? '/home' : '/') &&
                'font-bold text-blue-500'
              )}
            >
              <Link href={isLoggedIn ? '/home' : '/'}>Home</Link>
            </li>
            <li
              className={cn(
                'hover:text-blue-500 transition-colors',
                pathname.includes('/services') && 'font-bold text-blue-500'
              )}
            >
              <Link href="/services">Requests</Link>
            </li>
            <li
              className={cn(
                'hover:text-blue-500 transition-colors',
                pathname.includes('/reviews') && 'font-bold text-blue-500'
              )}
            >
              <Link href="/">Services</Link>
            </li>
          </ul>
          <div className="flex gap-x-4 items-center">
            <div className="flex gap-x-2 items-center">
              <Input placeholder="Search for the service" />
              <Button><Search className="w-4 h-4" /></Button>
            </div>

            {user?.email ? (
              <Link href="/profile">
                <div className="flex items-center gap-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={DUMMY_AVATAR_IMG} />
                    <AvatarFallback>{user?.email?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{user?.email?.substring(0, 9)}...</span>
                </div>
              </Link>
            ) : (
              <div>
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    startIcon={<LogIn className="w-4 h-4" />}
                    className="mr-2"
                  >
                    Login
                  </Button>
                </Link>
                <Button startIcon={<CircleUser className="w-4 h-4" />}>
                  Join as professional
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
