import { TReportColProps } from '@/types/client/Reports';
import { ReportColumnItem } from './ReportColumnItem';

export const ReportColumn = ({ name, reports, dragProps }: TReportColProps) => {
  return (
    <section
      className="flex w-full max-w-[200px] flex-col border px-2"
      data-node-id={name}
    >
      <h3 className="mb-2 border-b py-2 text-center text-amber-950">{name}</h3>
      {reports.map((rep) => (
        <ReportColumnItem
          key={rep.id + name}
          report={rep}
          dragProps={dragProps}
        />
      ))}
    </section>
  );
};
