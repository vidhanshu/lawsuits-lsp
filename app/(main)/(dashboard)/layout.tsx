import { PropsWithChildren } from 'react';

import Container from '@/src/common/components/Container';
import ProfileSidebar from '@/src/dashboard/components/sidebar/Sidebar';

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <Container className="md:flex">
      <div className="md:sticky md:top-[55px] md:border-r md:pr-4 md:h-[calc(100vh-60px)]">
        <ProfileSidebar />
      </div>

      <main className="flex-1 md:py-8 md:pl-8">{children}</main>
    </Container>
  );
}
