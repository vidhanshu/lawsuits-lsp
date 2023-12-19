import dayjs from 'dayjs';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

import { NSAuthUser } from '@/src/auth/types';
import { Button } from '@/components/ui/button';
import RequestDetailModal from './RequestDetailModal';
import { Separator } from '@/components/ui/separator';
import StatusChip from '@/src/common/components/StatusChip';
import { stringShortener } from '@/src/common/utils/helpers';
import GenericDialog from '@/src/common/components/GenericDialog';
import { getVariantByStatus } from '@/src/dashboard/utils/helpers';
import { routes } from '@/src/common/utils/constants';

export default function TabContent({
  data,
  handleCancelReq,
  handleDeleteReq,
}: {
  data: NSAuthUser.TRequest;
  handleCancelReq: (id: string) => void;
  handleDeleteReq: (id: string) => void;
}) {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -50, opacity: 0 }}
      className="border rounded-md px-4 py-2"
    >
      <div>
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-gray-500">
              {dayjs(new Date(data?.createdAt)).format('DD/MM/YY h:m a')}
            </p>
            <h1 className="mt-2 text-lg font-medium flex-1">{data?.subject}</h1>
          </div>
          <StatusChip
            variant={getVariantByStatus(data.status)}
            label={data.status?.toLowerCase()}
          />
        </div>
        <Separator className="my-2" />
        <p className="text-sm text-gray-500">
          {stringShortener(data?.description, 100)}
        </p>

        <div className="mt-4 flex justify-end gap-x-4">
          <RequestDetailModal data={data}>
            <Button size="xs">View details</Button>
          </RequestDetailModal>
          {data.status === 'PENDING' || data.status === 'REJECTED' ? (
            <GenericDialog
              variant="error"
              title="Are you sure?"
              description={
                data?.status === 'REJECTED'
                  ? 'Are you sure you want to delete this request?'
                  : 'Are you sure you want to cancel this request?'
              }
              handleSubmit={() =>
                data?.status === 'PENDING'
                  ? handleCancelReq(data.id)
                  : handleDeleteReq(data.id)
              }
            >
              <Button size="xs" endIcon={<X size={20} />} variant="destructive">
                {data?.status === 'REJECTED'
                  ? 'Delete request'
                  : 'Cancel request'}
              </Button>
            </GenericDialog>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
