import { ReportTypeSelect } from "@/components/ReportTypeSelect";
import { PropsWithChildren, useState } from "react";
import ReportTypeSwitcher from "./ReportType";
import { TReportType } from "@/types/reports";

export const CreateReport: React.FC<PropsWithChildren> = ({ children }) => {
  const [reportType, setType] = useState<TReportType | null>(null);

  return (
    <>
      <ReportTypeSelect setChosenReportType={setType} />
      <ReportTypeSwitcher reportType={reportType}>
        {children}
      </ReportTypeSwitcher>
    </>
  );
};
