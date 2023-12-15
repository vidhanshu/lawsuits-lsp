import React from "react";
import { FaStar } from "react-icons/fa";

import { cn } from "@/lib/utils";

const Stars = ({
  count,
  className,
  size = 20,
  ...props
}: { count: number; size?: number } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex", className)} {...props}>
      {new Array(count).fill(0).map((_, i) => (
        <FaStar key={i} size={size} className="fill-blue-500" />
      ))}
    </div>
  );
};

export default Stars;
