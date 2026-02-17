import { REPORT_TYPES } from '@/constants';
import { createSelectSchema } from 'drizzle-zod';
import {
  medicalReport,
  releaseReport,
  report,
  transferReport,
  vacationReport,
} from '@/db/schemas/reports';
import { TDBPerson } from '../persons';
import z from 'zod';
import { createUpdateFormSchema } from '@/modules/Reports/util/formSchemas';

export type TReportType = (typeof REPORT_TYPES)[number];
export type TReportStatus = 'inProgress' | 'approved' | 'declined' | 'created';

// types from db
export type TDBReport = typeof report.$inferSelect;
export type MedicalChunk = typeof medicalReport.$inferSelect;
export type TransferChunk = typeof transferReport.$inferSelect;
export type ReleaseChunk = typeof releaseReport.$inferSelect;
export type VacationChunk = typeof vacationReport.$inferSelect;
// -------------

export type MedicalReport = TDBReport &
  Omit<MedicalChunk, 'report_id'> & { type: 'medical' };
export type TransferReport = TDBReport &
  Omit<TransferChunk, 'report_id'> & { type: 'transfer' };
export type ReleaseReport = TDBReport &
  Omit<ReleaseChunk, 'report_id'> & { type: 'release' };
export type VacationReport = TDBReport &
  Omit<VacationChunk, 'report_id'> & { type: 'vacation' };
export type ComplaintReport = TDBReport & { type: 'complaint' };

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

export type TReportView = {
  person: TDBPerson;
  reports: Report[];
};

export type TRoot = TReportView[];

export type TReportAssigned = string;

export type TReportCreateUpdatePayload = z.infer<typeof createUpdateFormSchema>;

// Response Zod types from Drizzle tablesfor Elysia
export const MedicalChunkSchema = createSelectSchema(medicalReport);
export const VacationChunkSchema = createSelectSchema(vacationReport);
export const TransferChunkSchema = createSelectSchema(transferReport);
export const ReleaseChunkSchema = createSelectSchema(releaseReport);
export const ReportBaseSchema = createSelectSchema(report).extend({
  // Примусово змушуємо Zod приймати що завгодно (або рядок) для дат
  createdAt: z.any(),
  updatedAt: z.any(),
});

export const VacationReportResponseSchema = ReportBaseSchema.extend(
  VacationChunkSchema.shape,
)
  .extend({
    type: z.literal('vacation'),
  })
  .extend({
    vacationFrom: z.any(),
    vacationTo: z.any(),
  });

export const MedicalReportResponseSchema = ReportBaseSchema.extend(
  MedicalChunkSchema.shape,
).extend({
  type: z.literal('medical'),
});

export const TransferReportResponseSchema = ReportBaseSchema.extend(
  TransferChunkSchema.shape,
).extend({
  type: z.literal('transfer'),
});

export const ReleaseReportResponseSchema = ReportBaseSchema.extend(
  ReleaseChunkSchema.shape,
)
  .extend({
    type: z.literal('release'),
  })
  .extend({
    releaseDate: z.any(),
  });

export const ComplaintReportResponseSchema = ReportBaseSchema.extend({
  type: z.literal('complaint'),
});

export const ReportResponseSchema = z.discriminatedUnion('type', [
  MedicalReportResponseSchema,
  VacationReportResponseSchema,
  TransferReportResponseSchema,
  ReleaseReportResponseSchema,
  ComplaintReportResponseSchema,
]);

export type ReportResponse = z.infer<typeof ReportResponseSchema>;

// -----------------

export type JoinedRow =
  | {
      report: Report;
      medicalReport: MedicalReport | null;
    }
  | {
      report: Report;
      vacationReport: VacationReport | null;
    }
  | {
      report: Report;
      transferReport: TransferReport | null;
    }
  | {
      report: Report;
      releaseReport: ReleaseReport | null;
    };
