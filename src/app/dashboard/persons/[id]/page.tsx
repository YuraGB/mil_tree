import { PageWrapper } from '@/components/PageWrapper';
import { WidgetPage } from '@/modules/WidgetPage';
import { use } from 'react';

type Props = Promise<{ id: string }>;

const PersonPage = async (params: Props) => {
  const { id } = await params;
  return (
    <PageWrapper>
      Person {id}
      <WidgetPage personId={id} />
    </PageWrapper>
  );
};

export default PersonPage;
