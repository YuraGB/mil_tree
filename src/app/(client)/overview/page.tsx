'use cache';
import { api } from '@/elysia/eden';
import { OverviewModule } from '@/modules/Overview';
import { UnitNode } from '@/types/units';
import { Suspense } from 'react';

export default async function Overview() {
  const { data }: { data: UnitNode | null } = await api.overview.get();
  if (!data) return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OverviewModule data={data} />
    </Suspense>
  );
}
