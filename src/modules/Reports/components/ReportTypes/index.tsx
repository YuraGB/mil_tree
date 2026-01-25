import { ReportTypeSelect } from "@/components/ReportTypeSelect";
import { PropsWithChildren, useState } from "react";
import ReportTypeSwitcher from "./ReportType";
import { TReportCreateUpdatePayload, TReportType } from "@/types/reports";

export const CreateReport: React.FC<
  PropsWithChildren<{ onSubmit: (data: TReportCreateUpdatePayload) => void }>
> = ({ children, onSubmit }) => {
  const [reportType, setType] = useState<TReportType | null>(null);

  return (
    <>
      <ReportTypeSelect setChosenReportType={setType} />
      <ReportTypeSwitcher reportType={reportType} onSubmit={onSubmit}>
        {children}
      </ReportTypeSwitcher>
    </>
  );
};
