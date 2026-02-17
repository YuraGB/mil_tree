import { headers } from 'next/headers';
import { auth } from '@/elysia/modules/auth/auth';
import { ReactNode } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { SideBarClient } from '@/components/SideBarClient';
import { sideBarLinks } from '@/constants';

// export const dynamic = 'force-dynamic';

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    //  redirect('/');
  }

  return (
    <PageWrapper
      sidebar={<SideBarClient links={sideBarLinks} key={'side'} />}
      classes={{
        root: 'grid-cols-[150px_minmax(0,1fr)] justify justify-items-start',
        main: 'w-full h-full',
      }}
    >
      {children}
    </PageWrapper>
  );
}
