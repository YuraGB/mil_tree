import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateReport } from "../ReportTypes";
import { EditReport } from "../EditReport";
import { Report, TReportCreateUpdatePayload } from "@/types/reports";
import { useReportDialog } from "@/modules/Reports/hooks/useReportDialog";
import { ReportDialogFooter } from "./RepordDialogFooter";
import { CreateReportDialogHeader } from "./CreateReportDialogHeader";
import { EditReportDialogHeader } from "./EditReportDialogHeader";

export function ReportDialog({
  selectedReport,
  setSelectedReport,
  onSubmit,
}: {
  selectedReport: Report | null;
  setSelectedReport: (report: Report | null) => void;
  onSubmit: (data: TReportCreateUpdatePayload) => void;
}) {
  const { handleOpenChange, onClickHandler, open } = useReportDialog(
    selectedReport,
    setSelectedReport,
  );
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={onClickHandler}>
          Create Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        {selectedReport ? (
          <>
            <EditReportDialogHeader />
            <EditReport report={selectedReport} onSubmit={onSubmit}>
              <ReportDialogFooter />
            </EditReport>
          </>
        ) : (
          <>
            <CreateReportDialogHeader />
            <CreateReport onSubmit={onSubmit}>
              <ReportDialogFooter />
            </CreateReport>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
