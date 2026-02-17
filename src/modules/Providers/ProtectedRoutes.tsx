'use client';

import authClient from '@/elysia/modules/auth/auth-client';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

export const ProtectedRoutesProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  useEffect(() => {
    console.log(data);
    if (!isPending && !data) {
      router.push('/');
    }
  }, [data, isPending, router]);

  if (isPending || !data) {
    return null; // або <LoadingSpinner />
  }

  return children;
};
