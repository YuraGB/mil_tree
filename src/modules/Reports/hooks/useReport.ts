import { useReportDnD } from '@/modules/DragnDrop/hook/useReportDnd';
import { useEffect, useState } from 'react';

import { ReportResponse, TReportView } from '@/types/reports';
import { useReportService } from '../services/useReportService';
import { buildReportsColumns } from '../util/buldReportsMap';
import { useCreateUpdateForm } from './useCreateUpdateForm';
import { TPersonsRespons } from '@/types/persons';

export const useReport = (
  reports: ReportResponse[],
  persons: TPersonsRespons[],
) => {
  // Currently selected report
  // Also used as open/close state for the Create/Update report dialog
  const [selectedReport, setSelectedReport] = useState<ReportResponse | null>(
    null,
  );

  const { onSubmit, onUpdateReport } = useCreateUpdateForm(selectedReport);

  const [allReports, setReports] = useState<TReportView[]>(() =>
    buildReportsColumns(reports, persons),
  );

  // Load persons into cache
  useReportService({ persons });

  // State of the reports collections
  useEffect(() => {
    setReports(buildReportsColumns(reports, persons));
  }, [reports, persons]);

  const { draggingId, dropTargetId, dropPos, onDragStart } = useReportDnD(
    allReports,
    setReports,
    onUpdateReport,
  );

  return {
    allReports,
    setReports,
    draggingId,
    dropTargetId,
    dropPos,
    onDragStart,
    selectedReport,
    setSelectedReport,
    onSubmit,
  };
};
