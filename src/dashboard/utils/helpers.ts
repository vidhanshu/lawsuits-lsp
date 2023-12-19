import { NSAuthUser } from '@/src/auth/types';

export const getVariantByStatus = (status: NSAuthUser.TRequest['status']) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'ACCEPTED':
      return 'primary';
    case 'REJECTED':
      return 'destructive';
    case 'COMPLETED':
      return 'success';
    default:
      return 'warning';
  }
};
