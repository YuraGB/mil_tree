import { TPersonsRespons } from '@/types/persons';
import { ReportColumnItem } from './ReportColumnItem';
import { ReportResponse } from '@/types/reports';

export const ReportColumn = ({
  assignPerson,
  reports,
  setSelectedReport,
}: {
  assignPerson: TPersonsRespons;
  reports: ReportResponse[];
  setSelectedReport: (report: ReportResponse | null) => void;
}) => {
  return (
    <section
      className="flex w-full min-w-[200px] flex-col border px-2"
      data-node-id={assignPerson.id}
    >
      <h3 className="mb-2 border-b py-2 text-center text-amber-950">
        {assignPerson.name}
      </h3>
      {reports.map((rep) => (
        <ReportColumnItem
          key={rep.id}
          report={rep}
          setSelectedReport={setSelectedReport}
        />
      ))}
    </section>
  );
};
