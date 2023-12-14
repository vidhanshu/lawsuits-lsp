"use client";

import React, { PropsWithChildren } from 'react';

import Navbar from '@/src/common/components/nav/Navbar';
import { AuthPrivateGaurd } from '@/src/common/components/AuthGaurd';

const ProtectedLayout = ({children}:PropsWithChildren) => {
  return (
    <AuthPrivateGaurd>
      <Navbar />
      {children}
    </AuthPrivateGaurd>
  );
};

export default ProtectedLayout;
