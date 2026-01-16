import { memo } from 'react';
import { ComplaintReport } from './ComplaintReport';
import { VacationReport } from './VacationReport';
import { TransferReport } from './TransferReport';
import { MedicalReport } from './MedicalReport';
import { ReleaseReport } from './ReleaseReport';
import {
  IMedicalReport,
  ITransferReport,
  IVacationReport,
  Report,
  TReportType,
} from '@/types/reports';

export const ReportTypeSwitcher: React.FC<{
  reportType: TReportType | null;
  reportData?: Report;
  children?: React.ReactNode;
}> = ({ reportType, children, reportData }) => {
  switch (reportType) {
    case 'complaint':
      return (
        <ComplaintReport reportData={reportData as Report | undefined}>
          {children}
        </ComplaintReport>
      );
    case 'vacation':
      return (
        <VacationReport reportData={reportData as IVacationReport | undefined}>
          {children}
        </VacationReport>
      );
    case 'transfer':
      return (
        <TransferReport reportData={reportData as ITransferReport | undefined}>
          {children}
        </TransferReport>
      );
    case 'medical':
      return (
        <MedicalReport reportData={reportData as IMedicalReport | undefined}>
          {children}
        </MedicalReport>
      );
    case 'release':
      return (
        <ReleaseReport reportData={reportData as ITransferReport}>
          {children}
        </ReleaseReport>
      );
    default:
      return null;
  }
};
export default memo(ReportTypeSwitcher);
