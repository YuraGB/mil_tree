import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateReport } from "../ReportTypes";
import { EditReport } from "../EditReport";
import { Report } from "@/types/reports";
import { useReportDialog } from "../../hooks/useReportDialog";
import { ReportDialogFooter } from "./RepordDialogFooter";
import { CreateReportDialogHeader } from "./CreateReportDialogHeader";
import { EditReportDialogHeader } from "./EditReportDialogHeader";

export function ReportDialog({
  selectedReport,
  setSelectedReport,
}: {
  selectedReport: Report | null;
  setSelectedReport: (report: Report | null) => void;
}) {
  const { handleOpenChange, onClickHandler, open } = useReportDialog(
    selectedReport,
    setSelectedReport,
  );
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={onClickHandler}>
          Create Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {selectedReport ? (
          <EditReportDialogHeader />
        ) : (
          <CreateReportDialogHeader />
        )}
        {selectedReport ? (
          <EditReport report={selectedReport}>
            <ReportDialogFooter />
          </EditReport>
        ) : (
          <CreateReport>
            <ReportDialogFooter />
          </CreateReport>
        )}
      </DialogContent>
    </Dialog>
  );
}
