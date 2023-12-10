"use client";

import React from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';

import useUserContext from '@/src/auth/contexts/userContext/useUserContext';

type TLogoWithNameProps = Omit<ImageProps, 'src' | 'alt'> & {
  hasLink?: boolean;
};
const LogoWithName = ({ hasLink = true, ...rest }: TLogoWithNameProps) => {
  const { isLoggedIn } = useUserContext();

  if (hasLink) {
    return (
      <Link href={isLoggedIn ? "/home" : "/"}>
        <Image
          alt={'logo'}
          src="/logo/header_logo.svg"
          width={120}
          height={31}
          {...(rest || {})}
        />
      </Link>
    );
  }
  return (
    <Image
      alt={'logo'}
      src="/logo/header_logo.svg"
      width={120}
      height={31}
      {...(rest || {})}
    />
  );
};

export default LogoWithName;
