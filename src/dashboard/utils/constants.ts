import { routes } from '@/src/common/utils/constants';
import { LayoutDashboard, User, Settings } from 'lucide-react';

export const SIDEBAR_LINKS = [
  {
    title: 'Dashboard',
    Icon: LayoutDashboard,
    link: "/dashboard",
  },
  {
    title: 'My Profile',
    Icon: User,
    link: "/dashboard/profile",
  },
  {
    title: 'Settings',
    Icon: Settings,
    link: "/dashboard/settings",
  },
];

export const REQUSTS_TABS = [
  {
    label: 'All',
    value: 'ALL',
    status: 'ALL',
  },
  {
    label: 'Pending Requests',
    value: 'PENDING_REQ',
    status: 'PENDING',
  },
  {
    label: 'Accepted Requests',
    value: 'ACCEPTED_REQ',
    status: 'ACCEPTED',
  },
  {
    label: 'Completed Requests',
    value: 'COMPLETED_REQ',
    status: 'COMPLETED',
  },
  {
    label: 'Rejected Requests',
    value: 'CANCELLED_REQ',
    status: 'REJECTED',
  },
];
