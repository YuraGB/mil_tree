import { Report } from '@/types/reports';
import { ReportTypeSwitcher } from './ReportTypes/ReportType';

export const EditReport = ({
  report,
  children,
}: {
  report: Report;
  children?: React.ReactNode;
}) => {
  return (
    <ReportTypeSwitcher reportType={report.type} reportData={report}>
      {children}
    </ReportTypeSwitcher>
  );
};
