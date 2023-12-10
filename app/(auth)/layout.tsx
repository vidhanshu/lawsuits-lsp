import { AuthPublicGaurd } from '@/src/common/components/AuthGaurd';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <AuthPublicGaurd>{children}</AuthPublicGaurd>;
}
