import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { SIDEBAR_LINKS } from '@/src/dashboard/utils/constants';

const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {SIDEBAR_LINKS.map((item) => {
        return (
          <div key={item.link}>
            <Link
              href={item.link}
              className={cn(
                'flex gap-x-4 items-center w-fit',
                pathname === item.link && 'text-blue-500'
              )}
            >
              <item.Icon
                className={cn(
                  'w-4 h-4',
                  pathname === item.link && 'text-blue-500'
                )}
              />
              {item.title}
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default SidebarLinks;
