'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import LogoWithName from '@/src/common/components/LogoWithName';
import { SIDEBAR_LINKS } from '@/src/profile/utils/constants';
import { cn } from '@/lib/utils';

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="p-4">
      <LogoWithName />
      <div className="mt-4 bg-gray-200 h-[1px] w-full" />
      <div className="pt-4 space-y-4">
        {SIDEBAR_LINKS.map((item) => {
          return (
            <div key={item.link}>
              <Link
                href={item.link}
                className={cn(
                  'flex gap-x-4 items-center px-4 py-2 bg-blue-50/70 hover:bg-blue-50 rounded-sm',
                  pathname.includes(item.link) && 'font-semibold bg-blue-500 hover:bg-blue-600 text-white'
                )}
              >
                <item.Icon className={cn("w-5 h-5", !pathname.includes(item.link) && "text-blue-500" )} />
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
