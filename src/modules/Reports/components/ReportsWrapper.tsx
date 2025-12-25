'use client';
import React from 'react';
import { ReportColumn } from './ReportColumn';
import { DialogDemo } from './ReportForm';
import { useReport } from '../hooks/useReport';

export const ReportsWrapper: React.FC = () => {
  const {
    draggingId,
    dropPos,
    dropTargetId,
    onDragStart,
    root,
    selectedReport,
  } = useReport();

  return (
    <>
      <DialogDemo selectedReport={selectedReport} />
      <article className="flex h-full w-full gap-1">
        {Object.entries(root).map(([name, reports]) => (
          <ReportColumn
            name={name}
            reports={reports}
            key={name}
            dragProps={{
              draggingId,
              dropPos,
              dropTargetId,
              onDragStart,
            }}
          />
        ))}
      </article>
    </>
  );
};

export default ReportsWrapper;
