'use client';

import authClient from '@/elysia/modules/auth/auth-client';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

export const ProtectedRoutesProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const { data } = authClient.useSession();
  useEffect(() => {
    console.log(data);
    if (!data) {
      router.push('/');
    }
  }, [data, router]);

  return children;
};
