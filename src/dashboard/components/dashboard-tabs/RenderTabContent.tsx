import { PackageOpen } from 'lucide-react';

import { NSAuthUser } from '@/src/auth/types';
import TabContent from './TabContent';

export default function RenderTabContent({
  data,
  status,
  handleCancelReq,
  handleDeleteReq,
}: {
  data: NSAuthUser.TRequest[];
  status: NSAuthUser.TRequest['status'] | 'ALL';
  handleCancelReq: (id: string) => void;
  handleDeleteReq: (id: string) => void;
}) {
  let filteredD = [];

  if (status === 'ALL') {
    filteredD = data;
  } else {
    filteredD = data.filter((item) => item.status === status);
  }

  return (
    <div className="py-8 space-y-4">
      <>
        {!filteredD.length ? (
          <div className="flex justify-center items-center py-4">
            <div className="flex flex-col items-center">
              <PackageOpen size={30} className="text-gray-400" />
              <h1 className="text-lg font-medium text-gray-400">
                No {status.toLowerCase()} request found
              </h1>
            </div>
          </div>
        ) : (
          filteredD.map((item, idx) => (
            <TabContent
              handleCancelReq={handleCancelReq}
              handleDeleteReq={handleDeleteReq}
              key={idx}
              data={item}
            />
          ))
        )}
      </>
    </div>
  );
}
