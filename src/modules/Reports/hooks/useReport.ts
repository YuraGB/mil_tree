import { useReportDnD } from '@/modules/DragnDrop/hook/useReportDnd';
import { Report, TRoot } from '@/types/client/Reports';
import { useState } from 'react';
import rawData from '../dummy.json';
import { findReport } from '@/lib/dndMoveReports';

const data = rawData as TRoot;

export const useReport = () => {
  // State of the reports collections
  const [root, setRoot] = useState<TRoot>(data);
  // Currently selected report
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const { draggingId, dropTargetId, dropPos, onDragStart } = useReportDnD(
    root,
    setRoot,
  );

  // Wrap onDragStart to also set the selected report
  const onDragStartWrapper = (...args: Parameters<typeof onDragStart>) => {
    setSelectedReport(findReport(root, args[2])?.report || null);
    return onDragStart(...args);
  };

  return {
    root,
    setRoot,
    draggingId,
    dropTargetId,
    dropPos,
    onDragStart: onDragStartWrapper,
    selectedReport,
  };
};
