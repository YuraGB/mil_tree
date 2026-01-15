import { useReportDnD } from '@/modules/DragnDrop/hook/useReportDnd';
import { useEffect, useState } from 'react';

import { TDBPerson } from '@/types/persons';
import { Report, TReportView } from '@/types/reports';

export const useReport = (reports: Report[], persons: TDBPerson[]) => {
  const [allReports, setReports] = useState<{ [name: string]: TReportView[] }>(
    {},
  );
  // State of the reports collections
  useEffect(() => {
    const personsMap = new Map(persons.map((p) => [p.id, p]));

    const reportsWithPersons = reports.reduce<{ [key: string]: TReportView[] }>(
      (acc, r) => {
        const fromPerson = personsMap.get(r.fromPersonId);
        const toPerson = personsMap.get(r.toPersonId);

        const key = toPerson?.name || fromPerson?.name || r.status;

        // Ініціалізація масиву, якщо ще немає
        if (!acc[key]) acc[key] = [];

        acc[key].push({
          ...r,
          fromPersonName: fromPerson?.name,
          fromPersonRank: fromPerson?.rank,
          toPersonName: toPerson?.name,
          toPersonRank: toPerson?.rank,
        });

        return acc;
      },
      {}, // TS тепер знає тип
    );

    setReports(reportsWithPersons);
  }, [reports, persons]);

  // Currently selected report
  // Also used as open/close state for the Create/Update report dialog
  const [selectedReport, setSelectedReport] = useState<TReportView | null>(
    null,
  );

  const { draggingId, dropTargetId, dropPos, onDragStart } = useReportDnD(
    allReports,
    setReports,
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
