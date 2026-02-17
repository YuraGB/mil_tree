import { ReportResponse } from '@/types/reports';
import { useEffect, useState } from 'react';

export const useReportDialog = (
  selectedReport: ReportResponse | null,
  setSelectedReport: (report: ReportResponse | null) => void,
) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setSelectedReport(null);
    }
  };

  useEffect(() => {
    if (selectedReport) {
      requestAnimationFrame(() => setOpen(true));
    }
  }, [selectedReport]);

  const onClickHandler = () => setOpen(true);

  return {
    handleOpenChange,
    onClickHandler,
    selectedReport,
    open,
  };
};
