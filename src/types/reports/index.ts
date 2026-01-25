import { REPORT_TYPES } from "@/constants";
import {
  medicalReport,
  releaseReport,
  report,
  transferReport,
  vacationReport,
} from "@/db/schemas/reports";
import { TDBPerson } from "../persons";
import z from "zod";
import { createUpdateFormSchema } from "@/modules/Reports/util/formSchemas";

export type TReportType = (typeof REPORT_TYPES)[number];
export type TReportStatus = "inProgress" | "approved" | "declined" | "created";
export type TDBReport = typeof report.$inferSelect;
export type MedicalChunk = typeof medicalReport.$inferSelect;
export type TransferChunk = typeof transferReport.$inferSelect;
export type ReleaseChunk = typeof releaseReport.$inferSelect;
export type VacationChunk = typeof vacationReport.$inferSelect;

export type MedicalReport = TDBReport &
  Omit<MedicalChunk, "report_id"> & { type: "medical" };
export type TransferReport = TDBReport &
  Omit<TransferChunk, "report_id"> & { type: "transfer" };
export type ReleaseReport = TDBReport &
  Omit<ReleaseChunk, "report_id"> & { type: "release" };
export type VacationReport = TDBReport &
  Omit<VacationChunk, "report_id"> & { type: "vacation" };
export type ComplaintReport = TDBReport & { type: "complaint" };

export type IMedicalReport = MedicalReport;

export type ITransferReport = TransferReport;

export type IReleaseReport = ReleaseReport;

export type IVacationReport = VacationReport;

export type IComplaintReport = ComplaintReport;

export type Report =
  | MedicalReport
  | ReleaseReport
  | TransferReport
  | VacationReport
  | ComplaintReport;

export type ReportByType = {
  vacation: VacationReport;
  medical: MedicalReport;
  transfer: TransferReport;
  release: ReleaseReport;
  complaint: ComplaintReport;
};

export type TReportViewChunk = {
  fromPersonName: TDBPerson["name"];
  fromPersonRank: TDBPerson["rank"];
  toPersonName: TDBPerson["name"];
  toPersonRank: TDBPerson["rank"];
};

export type TReportView = Report & Partial<TReportViewChunk>;

export type TRoot = { [name: string]: TReportView[] };

export type TReportAssigned = string;

export type TReportCreateUpdatePayload = z.infer<typeof createUpdateFormSchema>;
