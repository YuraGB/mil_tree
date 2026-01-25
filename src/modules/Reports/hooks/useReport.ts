import { useReportDnD } from "@/modules/DragnDrop/hook/useReportDnd";
import { useEffect, useState } from "react";

import { TDBPerson } from "@/types/persons";
import { Report, TReportView } from "@/types/reports";
import { useReportService } from "../services/useReportService";
import { buildReportsMap } from "../util/buldReportsMap";
import { useCreateUpdateForm } from "./useCreateUpdateForm";

export const useReport = (reports: Report[], persons: TDBPerson[]) => {
  // Currently selected report
  // Also used as open/close state for the Create/Update report dialog
  const [selectedReport, setSelectedReport] = useState<TReportView | null>(
    null,
  );

  const { onSubmit, onUpdateReport } = useCreateUpdateForm(selectedReport);

  const [allReports, setReports] = useState<{ [name: string]: TReportView[] }>(
    () => buildReportsMap(reports, persons),
  );

  // Load persons into cache
  useReportService({ persons });

  // State of the reports collections
  useEffect(() => {
    setReports(buildReportsMap(reports, persons));
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
