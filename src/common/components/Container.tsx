import React from "react";

import { cn } from "@/lib/utils";

type TContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  sectionTitle?: string;
};

const Container = ({
  as,
  children,
  className,
  sectionTitle,
  ...props
}: TContainerProps) => {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-0",
        className,
      )}
      {...props}
    >
      {sectionTitle && (
        <h1 className="max-w-3xl mx-auto text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800">
          {sectionTitle}
        </h1>
      )}
      {children}
    </Component>
  );
};

export default Container;
