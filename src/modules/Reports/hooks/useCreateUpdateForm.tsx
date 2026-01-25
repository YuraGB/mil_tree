import { useCreateUpdateService } from "../services/useCreateUpdateService";
import { Report, TReportCreateUpdatePayload } from "@/types/reports";

export const useCreateUpdateForm = (selectedReport: Report | null) => {
  const { onCreateReport, onUpdateReport } = useCreateUpdateService();
  const onSubmit = (values: TReportCreateUpdatePayload) => {
    console.log("Submitting form with values:", values);
    if (selectedReport) {
      // Update existing report
      onUpdateReport({ ...values, id: selectedReport.id });
    } else {
      // Create new report
      onCreateReport(values);
    }
  };
  return { onSubmit, onCreateReport, onUpdateReport };
};
