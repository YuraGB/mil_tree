import { Button } from "@/components/ui/button";
import { Report } from "@/types/reports";
import { Edit2Icon } from "lucide-react";

export const ReportColumnItem = ({
  report,
  setSelectedReport,
}: {
  report: Report;
  setSelectedReport?: (report: Report | null) => void;
}) => {
  const onDialogOpen = () => {
    if (setSelectedReport) {
      setSelectedReport(report);
    }
  };
  return (
    <Button
      variant={"secondary"}
      data-node-id={report.id}
      className={`card flex p-2`}
    >
      {report.type}
      <span
        role="button"
        tabIndex={0}
        className="relative top-0 right-0 z-10 m-2 ml-auto inline-block cursor-pointer"
        onClick={onDialogOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onDialogOpen();
          }
        }}
        aria-label="Edit report"
      >
        <Edit2Icon />
      </span>
    </Button>
  );
};
