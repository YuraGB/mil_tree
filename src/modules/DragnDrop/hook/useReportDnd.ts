'use client';
import { useCallback, useEffect } from 'react';
import { useDnDHelpers } from './helpers';
import { findReport, moveReport } from '@/lib/dndMoveReports';
import { TReportView, TRoot } from '@/types/reports';

export function useReportDnD(
  root: { [name: string]: TReportView[] },
  setRoot: React.Dispatch<React.SetStateAction<TRoot>>,
) {
  // this will update the Reports state
  // This callback will trigger if drag and drop will be successfull
  const onUpdateStateCallback = useCallback(
    (draggingId: TReportView['id'], dropTargetId: TReportView['id']) => {
      setRoot((prev) => {
        const found = findReport(prev, draggingId);
        if (!found) return prev;

        const updated = moveReport(
          found.report,
          prev,
          found.assigned,
          dropTargetId,
        );

        return updated ?? prev;
      });
    },
    [setRoot],
  );

  const { onMove, onUp, onDragStart, draggingId, dropPos, dropTargetId } =
    useDnDHelpers(onUpdateStateCallback);

  useEffect(() => {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [draggingId, dropTargetId, dropPos, root, setRoot, onMove, onUp]);

  return {
    draggingId,
    dropTargetId,
    dropPos,
    onDragStart,
  };
}
