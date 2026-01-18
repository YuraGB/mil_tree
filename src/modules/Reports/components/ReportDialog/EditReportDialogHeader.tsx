import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const EditReportDialogHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle>Update Report</DialogTitle>
      <DialogDescription>
        The report that you have opened can be edited.
      </DialogDescription>
    </DialogHeader>
  );
};
