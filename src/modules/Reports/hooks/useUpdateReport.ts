import { useState } from 'react';

export const useUpdateReport = () => {
  // State and logic for creating or updating a report would go here
  // Currently selected report
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return {
    selectedReport,
    setSelectedReport,
  };
};
