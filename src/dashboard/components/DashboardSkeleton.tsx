import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-x-4">
        <Skeleton className="h-[40px] w-full rounded-sm" />
        <Skeleton className="h-[40px] w-full rounded-sm" />
        <Skeleton className="h-[40px] w-full rounded-sm" />
        <Skeleton className="h-[40px] w-full rounded-sm" />
        <Skeleton className="h-[40px] w-full rounded-sm" />
      </div>

      <div className="flex flex-col items-center gap-y-4">
        <Skeleton className="h-[80px] w-full rounded-sm" />
        <Skeleton className="h-[80px] w-full rounded-sm" />
        <Skeleton className="h-[80px] w-full rounded-sm" />
        <Skeleton className="h-[80px] w-full rounded-sm" />
        <Skeleton className="h-[80px] w-full rounded-sm" />
        <Skeleton className="h-[80px] w-full rounded-sm" />
      </div>
    </div>
  );
}
