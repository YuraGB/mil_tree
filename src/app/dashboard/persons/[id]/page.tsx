// src/app/dashboard/persons/[id]/page.tsx
import { PageWrapper } from '@/components/PageWrapper';
import { WidgetPage } from '@/modules/WidgetPage';

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageWrapper>
      Person {id}
      <WidgetPage personId={id} />
    </PageWrapper>
  );
}
