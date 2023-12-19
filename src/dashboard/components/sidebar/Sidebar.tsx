'use client';

import MobileSidebar from './MobileSidebar';
import SidebarLinks from './SidebarLinks';

export default function ProfileSidebar() {
  return (
    <div>
      <MobileSidebar />

      <aside className="hidden md:block p-4 pl-0">
        <div className="pt-4 space-y-4 ">
          <SidebarLinks />
        </div>
      </aside>
    </div>
  );
}
