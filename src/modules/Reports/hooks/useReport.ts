import { useReportDnD } from "@/modules/DragnDrop/hook/useReportDnd";
import { useEffect, useState } from "react";

import { TDBPerson } from "@/types/persons";
import { Report, TReportView } from "@/types/reports";

const buildReportsMap = (
  reports: Report[],
  persons: TDBPerson[]
): { [name: string]: TReportView[] } => {
  const personsMap = new Map(persons.map((p) => [p.id, p]));

  return reports.reduce<{ [key: string]: TReportView[] }>((acc, r) => {
    const fromPerson = personsMap.get(r.fromPersonId);
    const toPerson = personsMap.get(r.toPersonId);

    const key = toPerson?.name || fromPerson?.name || r.status;

    if (!acc[key]) acc[key] = [];

    acc[key].push({
      ...r,
      fromPersonName: fromPerson?.name,
      fromPersonRank: fromPerson?.rank,
      toPersonName: toPerson?.name,
      toPersonRank: toPerson?.rank,
    });

    return acc;
  }, {});
};

export const useReport = (reports: Report[], persons: TDBPerson[]) => {
  const [allReports, setReports] = useState<{ [name: string]: TReportView[] }>(
    () => buildReportsMap(reports, persons)
  );

  // State of the reports collections
  useEffect(() => {
    setReports(buildReportsMap(reports, persons));
  }, [reports, persons]);

  // Currently selected report
  // Also used as open/close state for the Create/Update report dialog
  const [selectedReport, setSelectedReport] = useState<TReportView | null>(
    null
  );

  const { draggingId, dropTargetId, dropPos, onDragStart } = useReportDnD(
    allReports,
    setReports
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
  };
};
