import { Report, TReportCreateUpdatePayload } from "@/types/reports";
import { ReportTypeSwitcher } from "./ReportTypes/ReportType";

export const EditReport = ({
  report,
  children,
  onSubmit,
}: {
  report: Report;
  children?: React.ReactNode;
  onSubmit: (data: TReportCreateUpdatePayload) => void;
}) => {
  return (
    <ReportTypeSwitcher
      reportType={report.type}
      reportData={report}
      onSubmit={onSubmit}
    >
      {children}
    </ReportTypeSwitcher>
  );
};
