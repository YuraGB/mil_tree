import { PageWrapper } from '@/components/PageWrapper';
import { Auth } from '@/modules/Auth';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <PageWrapper>
      <h1>Home</h1>
      <Suspense>
        <Auth />
      </Suspense>
    </PageWrapper>
  );
}
