import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const CreateReportDialogHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle>Please, choose the report type</DialogTitle>
      <DialogDescription>
        The report type defines the structure and required fields of the report
        you are about to create.
      </DialogDescription>
    </DialogHeader>
  );
};
