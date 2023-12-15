import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/src/common/utils/constants";

import { cn } from "@/lib/utils";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV_LINKS.map((item, index) => (
        <li
          key={index}
          className={cn(
            "hover:text-blue-500 transition-colors",
            pathname === item.path && "font-bold text-blue-500",
          )}
        >
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </>
  );
}
