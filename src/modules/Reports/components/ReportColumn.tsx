import { ReportColumnItem } from "./ReportColumnItem";
import { Report, TReportView } from "@/types/reports";

export const ReportColumn = ({
  name,
  reports,
  setSelectedReport,
}: {
  name: string;
  reports: TReportView[];
  setSelectedReport: (report: Report | null) => void;
}) => {
  return (
    <section
      className="flex w-full min-w-[200px] flex-col border px-2"
      data-node-id={name}
    >
      <h3 className="mb-2 border-b py-2 text-center text-amber-950">{name}</h3>
      {reports.map((rep) => (
        <ReportColumnItem
          key={rep.id + name}
          report={rep}
          setSelectedReport={setSelectedReport}
        />
      ))}
    </section>
  );
};
