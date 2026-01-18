"use client";
import React from "react";
import { ReportColumn } from "./ReportColumn";
import { useReport } from "../hooks/useReport";
import { Report } from "@/types/reports";
import { TDBPerson } from "@/types/persons";
import { ReportDialog } from "./ReportDialog";

export const ReportsWrapper: React.FC<{
  reports: Report[] | [];
  persons: TDBPerson[] | [];
}> = ({ reports, persons }) => {
  const { allReports, selectedReport, setSelectedReport, onDragStart } =
    useReport(reports, persons);

  return (
    <>
      <ReportDialog
        selectedReport={selectedReport}
        setSelectedReport={setSelectedReport}
      />
      <div
        role="presentation"
        className="scrollbar grid h-full w-full auto-cols-[minmax(200px,1fr)] grid-flow-col gap-1 overflow-x-auto"
        onMouseDown={onDragStart}
      >
        {Object.entries(allReports).map(([name, reports]) => (
          <ReportColumn
            name={name}
            setSelectedReport={setSelectedReport}
            reports={reports}
            key={name}
          />
        ))}
      </div>
    </>
  );
};

export default ReportsWrapper;
