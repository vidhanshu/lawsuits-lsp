import { ChevronRightCircle } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SidebarLinks from './SidebarLinks';
import { Button } from '@/components/ui/button';

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" className="mb-4" size="sm">
          <ChevronRightCircle className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <aside className="p-4">
          <div className="pt-4 space-y-4 ">
            <SidebarLinks />
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
}
