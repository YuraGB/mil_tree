'use cache';
import ReportsWrapper from './components/ReportsWrapper';
import { getReportsData } from './util/getReportsData';

export const ReportsComponent = async () => {
  const data = await getReportsData();
  if (!data) return null;

  return (
    <article className="scrollbar h-full w-full p-4">
      <ReportsWrapper
        reports={data.repsData ?? []}
        persons={data.persData ?? []}
      />
    </article>
  );
};
