import OverviewData from '@/modules/Overview/OverviewData';
import { Suspense } from 'react';

export default function OverviewPage() {
  return (
    <Suspense fallback={<div>Loading overview…</div>}>
      <OverviewData />
    </Suspense>
  );
}
