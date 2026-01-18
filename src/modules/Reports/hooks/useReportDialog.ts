import { Report } from "@/types/reports";
import { useEffect, useState } from "react";

export const useReportDialog = (
  selectedReport: Report | null,
  setSelectedReport: (report: Report | null) => void
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
