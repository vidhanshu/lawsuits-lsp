import ProfileSidebar from '@/src/profile/components/Sidebar';
import { PropsWithChildren } from 'react';

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-12 h-[calc(100vh-50px)]">
      <div className="col-span-2 border-r">
        <ProfileSidebar />
      </div>
      <div className="col-span-10 p-4">{children}</div>
    </div>
  );
}
