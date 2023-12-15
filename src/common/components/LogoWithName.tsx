"use client";

import React from "react";
import Link from "next/link";
import Image, { ImageProps } from "next/image";

import { routes } from "@/src/common/utils/constants";
import { cn } from "@/lib/utils";

type TLogoWithNameProps = Omit<ImageProps, "src" | "alt"> & {
  hasLink?: boolean;
  isResponsive?: boolean;
};
const LogoWithName = ({
  isResponsive = true,
  hasLink = true,
  className,
  ...rest
}: TLogoWithNameProps) => {
  if (hasLink) {
    return (
      <Link href={routes.HOME_ROUTE}>
        <Image
          alt={"logo"}
          src="/logo/header_logo.svg"
          width={120}
          height={31}
          className={cn(className, isResponsive && "hidden md:block")}
          {...(rest || {})}
        />
        {isResponsive && (
          <Image
            alt={"logo"}
            src="/logo/logo_blue.svg"
            className={cn(className, "md:hidden")}
            width={28}
            height={28}
            {...(rest || {})}
          />
        )}
      </Link>
    );
  }
  return (
    <>
      <Image
        alt={"logo"}
        src="/logo/header_logo.svg"
        width={120}
        height={31}
        className={cn(className, isResponsive && "hidden md:block")}
        {...(rest || {})}
      />
      {isResponsive && (
        <Image
          alt={"logo"}
          src="/logo/logo_blue.svg"
          className={cn(className, "md:hidden")}
          width={28}
          height={28}
          {...(rest || {})}
        />
      )}
    </>
  );
};

export default LogoWithName;
