import { useCreateUpdateService } from '../services/useCreateUpdateService';
import { ReportResponse, TReportCreateUpdatePayload } from '@/types/reports';

export const useCreateUpdateForm = (selectedReport: ReportResponse | null) => {
  const { onCreateReport, onUpdateReport } = useCreateUpdateService();
  const onSubmit = (values: TReportCreateUpdatePayload) => {
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
