import { db } from '@/db';
import {
  medicalReport,
  releaseReport,
  report,
  transferReport,
  vacationReport,
} from '@/db/schemas/reports';
import { Report, TReportCreateUpdatePayload } from '@/types/reports';
import { eq, ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { VercelPgQueryResultHKT } from 'drizzle-orm/vercel-postgres';

export const getAllReports = async () => {
  try {
    const rows = await db
      .select({
        id: report.id,
        type: report.type,
        fromPersonId: report.fromPersonId,
        toPersonId: report.toPersonId,
        status: report.status,
        decisionReason: report.decisionReason,
        assignedToPersonId: report.assignedToPersonId,
        decidedByPersonId: report.decidedByPersonId,
        description: report.description,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
        // дочірні таблиці
        diagnosis: medicalReport.diagnosis,
        treatment: medicalReport.treatment,
        releaseDate: releaseReport.releaseDate,
        releaseReason: releaseReport.releaseReason,
        transferFromReport: transferReport.transferFromReport,
        transferToReport: transferReport.transferToReport,
        transferReason: transferReport.reason, // буде згодом призначено в reason
        vacationFrom: vacationReport.vacationFrom,
        vacationTo: vacationReport.vacationTo,
        vacationReason: vacationReport.reason, // буде згодом призначено в reason
      })
      .from(report)
      .leftJoin(medicalReport, eq(medicalReport.reportId, report.id))
      .leftJoin(releaseReport, eq(releaseReport.reportId, report.id))
      .leftJoin(transferReport, eq(transferReport.reportId, report.id))
      .leftJoin(vacationReport, eq(vacationReport.reportId, report.id));

    const result = rows.map((r) => {
      const base = {
        id: r.id,
        reportId: r.id,
        type: r.type,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        fromPersonId: r.fromPersonId,
        toPersonId: r.toPersonId,
        status: r.status,
        decisionReason: r.decisionReason,
        assignedToPersonId: r.assignedToPersonId,
        decidedByPersonId: r.decidedByPersonId,
        description: r.description,
      };

      switch (r.type) {
        case 'medical':
          return {
            ...base,
            type: 'medical',
            diagnosis: r.diagnosis || '',
            treatment: r.treatment || '',
          };
        case 'release':
          return {
            ...base,
            type: 'release',
            releaseDate: r.releaseDate!.toISOString(),
            releaseReason: r.releaseReason || '',
          };
        case 'transfer':
          return {
            ...base,
            type: 'transfer',
            transferFromReport: r.transferFromReport || '',
            transferToReport: r.transferToReport || '',
            reason: r.transferReason || '', // правильно мапимо у reason
          };
        case 'vacation':
          return {
            ...base,
            type: 'vacation',
            vacationFrom: r.vacationFrom?.toISOString(),
            vacationTo: r.vacationTo?.toISOString(),
            reason: r.vacationReason || '', // правильно мапимо у reason
          };
        default:
          throw new Error('Unknown report type: ' + r.type);
      }
    });

    return result;
  } catch (e) {
    console.error('Error fetching reports:', e);
    return [];
  }
};

export const createReport = async (data: TReportCreateUpdatePayload) => {
  try {
    const created = await db.transaction(async (tx) => {
      const { type, assignedTo, ...rest } = data;

      const [createdReport] = await tx
        .insert(report)
        .values({
          id: crypto.randomUUID(),
          type,
          assignedToPersonId: assignedTo,
          fromPersonId: assignedTo,
          toPersonId: assignedTo,
          description: 'description' in rest ? rest.description : undefined,
        })
        .returning();

      // complaint doesn't have any chunks to create
      if (type === 'complaint') {
        return createdReport;
      }

      switch (data.type) {
        case 'vacation':
          await tx.insert(vacationReport).values({
            reportId: createdReport.id,
            vacationFrom: new Date(data.vacationFrom),
            vacationTo: new Date(data.vacationTo),
          });
          break;

        case 'release':
          await tx.insert(releaseReport).values({
            reportId: createdReport.id,
            releaseDate: new Date(data.releaseDate),
            releaseReason: data.reason,
          });
          break;

        case 'medical':
          await tx.insert(medicalReport).values({
            reportId: createdReport.id,
            diagnosis: data.diagnosis,
            treatment: data.treatment,
          });
          break;
      }

      return await getReportWithChunk(type, createdReport.id, tx);
    });

    return created;
  } catch (e) {
    console.error('Error creating report', e);
    return null;
  }
};

export const updateReport = async (
  data: TReportCreateUpdatePayload & { id: string },
) => {
  const { id, type, assignedTo } = data;

  try {
    return await db.transaction(async (tx) => {
      await tx
        .update(report)
        .set({
          type,
          assignedToPersonId: assignedTo,
          toPersonId: assignedTo,
          description: 'description' in data ? data.description : undefined,
        })
        .where(eq(report.id, id));

      // 🔹 details
      switch (type) {
        case 'medical':
          await tx
            .update(medicalReport)
            .set({
              diagnosis: data.diagnosis,
              treatment: data.treatment,
            })
            .where(eq(medicalReport.reportId, id));
          break;

        case 'vacation':
          await tx
            .update(vacationReport)
            .set({
              vacationFrom: new Date(data.vacationFrom),
              vacationTo: new Date(data.vacationTo),
            })
            .where(eq(vacationReport.reportId, id));
          break;

        case 'transfer':
          await tx
            .update(transferReport)
            .set({
              transferFromReport: data.transferFrom,
              transferToReport: data.transferTo,
              reason: data.reason,
            })
            .where(eq(transferReport.reportId, id));
          break;

        case 'release':
          await tx
            .update(releaseReport)
            .set({
              releaseDate: new Date(data.releaseDate),
              releaseReason: data.reason,
            })
            .where(eq(releaseReport.reportId, id));
          break;

        case 'complaint':
          break;
      }

      return await getReportWithChunk(type, id, tx);
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('Error during update report', e.message, data);
    } else {
      console.log('Error during update report', e);
    }
    return null;
  }
};

export const deleteReport = async () => {};

// helper
async function getReportWithChunk(
  type: Report['type'],
  reortId: Report['id'],
  tx: PgTransaction<
    VercelPgQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >,
) {
  // get base report and chunk (medical, vacation, etc...)
  switch (type) {
    case 'medical': {
      const [row] = await tx
        .select()
        .from(report)
        .leftJoin(medicalReport, eq(medicalReport.reportId, report.id))
        .where(eq(report.id, reortId));

      return {
        ...row.report,
        ...row.medical_report,
      };
    }

    case 'vacation': {
      const [row] = await tx
        .select()
        .from(report)
        .leftJoin(vacationReport, eq(vacationReport.reportId, report.id))
        .where(eq(report.id, reortId));

      return {
        ...row.report,
        ...row.vacation_report,
      };
    }
    case 'release': {
      const [row] = await tx
        .select()
        .from(report)
        .leftJoin(releaseReport, eq(releaseReport.reportId, report.id))
        .where(eq(report.id, reortId));

      return {
        ...row.report,
        ...row.release_report,
      };
    }
    case 'transfer': {
      const [row] = await tx
        .select()
        .from(report)
        .leftJoin(transferReport, eq(vacationReport.reportId, report.id))
        .where(eq(report.id, reortId));

      return {
        ...row.report,
        ...row.transfer_report,
      };
    }

    default: {
      const [row] = await tx
        .select()
        .from(report)
        .where(eq(report.id, reortId));
      return row;
    }
  }
}
