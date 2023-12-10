import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const FullScreenLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex items-center justify-center flex-col">
        <Image src="/logo/logo_blue.svg" alt="logo" width={50} height={50} />
        <h1 className="font-extrabold text-xl text-center">LawSuits</h1>
        <Loader2Icon className="animate-spin text-primary" size={50} />
      </div>
    </div>
  );
};

export default FullScreenLoader;
