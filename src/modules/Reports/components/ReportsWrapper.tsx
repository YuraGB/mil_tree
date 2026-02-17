'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';

import { ReportColumn } from './ReportColumn';
import { useReport } from '@/modules/Reports/hooks/useReport';

import { Report } from '@/types/reports';
import { TDBPerson } from '@/types/persons';

const ReportDialog = dynamic(
  () => import('./ReportDialog').then((mod) => mod.ReportDialog),
  { ssr: false },
);

export const ReportsWrapper: FC<{
  reports: Report[] | [];
  persons: TDBPerson[] | [];
}> = ({ reports, persons }) => {
  const {
    allReports,
    selectedReport,
    setSelectedReport,
    onDragStart,
    onSubmit,
  } = useReport(reports, persons);

  const z = Object.entries(allReports);
  return (
    <>
      <ReportDialog
        selectedReport={selectedReport}
        setSelectedReport={setSelectedReport}
        onSubmit={onSubmit}
      />
      <div
        role="presentation"
        className="scrollbar grid h-full w-full auto-cols-[minmax(200px,1fr)] grid-flow-col gap-1 overflow-x-auto"
        onMouseDown={onDragStart}
      >
        {allReports.map(({ person, reports }) => (
          <ReportColumn
            assignPerson={person}
            setSelectedReport={setSelectedReport}
            reports={reports}
            key={person.id}
          />
        ))}
      </div>
    </>
  );
};

export default ReportsWrapper;
