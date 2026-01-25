import { memo } from "react";
import { ComplaintReport } from "./ComplaintReport";
import { VacationReport } from "./VacationReport";
import { TransferReport } from "./TransferReport";
import { MedicalReport } from "./MedicalReport";
import { ReleaseReport } from "./ReleaseReport";
import {
  IMedicalReport,
  IReleaseReport,
  ITransferReport,
  IVacationReport,
  Report,
  TReportCreateUpdatePayload,
  TReportType,
} from "@/types/reports";

export const ReportTypeSwitcher: React.FC<{
  reportType: TReportType | null;
  reportData?: Report;
  children?: React.ReactNode;
  onSubmit: (data: TReportCreateUpdatePayload) => void;
}> = ({ reportType, children, reportData, onSubmit }) => {
  switch (reportType) {
    case "complaint":
      return (
        <ComplaintReport
          reportData={reportData as Report | undefined}
          onSubmit={onSubmit}
        >
          {children}
        </ComplaintReport>
      );
    case "vacation":
      return (
        <VacationReport
          reportData={reportData as IVacationReport | undefined}
          onSubmit={onSubmit}
        >
          {children}
        </VacationReport>
      );
    case "transfer":
      return (
        <TransferReport
          reportData={reportData as ITransferReport | undefined}
          onSubmit={onSubmit}
        >
          {children}
        </TransferReport>
      );
    case "medical":
      return (
        <MedicalReport
          reportData={reportData as IMedicalReport | undefined}
          onSubmit={onSubmit}
        >
          {children}
        </MedicalReport>
      );
    case "release":
      return (
        <ReleaseReport
          reportData={reportData as IReleaseReport | undefined}
          onSubmit={onSubmit}
        >
          {children}
        </ReleaseReport>
      );
    default:
      return null;
  }
};
export default memo(ReportTypeSwitcher);
