import { db } from '@/db';
import {
  medicalReport,
  releaseReport,
  report,
  transferReport,
  vacationReport,
} from '@/db/schemas/reports';
import {
  MedicalReport,
  ReleaseReport,
  TransferReport,
  VacationReport,
} from '@/types/reports';
import { eq } from 'drizzle-orm';

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
        transferReason: transferReport.reason,
        vacationFrom: vacationReport.vacationFrom,
        vacationTo: vacationReport.vacationTo,
        vacationReason: vacationReport.reason,
      })
      .from(report)
      .leftJoin(medicalReport, eq(medicalReport.reportId, report.id))
      .leftJoin(releaseReport, eq(releaseReport.reportId, report.id))
      .leftJoin(transferReport, eq(transferReport.reportId, report.id))
      .leftJoin(vacationReport, eq(vacationReport.reportId, report.id));

    return rows.map((r) => {
      switch (r.type) {
        case 'medical':
          return {
            id: r.id,
            type: 'medical',
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            fromPersonId: r.fromPersonId,
            toPersonId: r.toPersonId,
            status: r.status,
            decisionReason: r.decisionReason,
            assignedToPersonId: r.assignedToPersonId,
            decidedByPersonId: r.decidedByPersonId,
            description: r.description,
            diagnosis: r.diagnosis!,
            treatment: r.treatment!,
          } as MedicalReport;

        case 'release':
          return {
            id: r.id,
            type: 'release',
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            fromPersonId: r.fromPersonId,
            toPersonId: r.toPersonId,
            status: r.status,
            decisionReason: r.decisionReason,
            assignedToPersonId: r.assignedToPersonId,
            decidedByPersonId: r.decidedByPersonId,
            description: r.description,
            releaseDate: r.releaseDate!,
            releaseReason: r.releaseReason!,
          } as ReleaseReport;

        case 'transfer':
          return {
            id: r.id,
            type: 'transfer',
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            fromPersonId: r.fromPersonId,
            toPersonId: r.toPersonId,
            status: r.status,
            decisionReason: r.decisionReason,
            assignedToPersonId: r.assignedToPersonId,
            decidedByPersonId: r.decidedByPersonId,
            description: r.description,
            transferFrom: r.transferFromReport!, // ⚠ повинні збігатися назви
            transferTo: r.transferToReport!,
            transferReason: r.transferReason!,
          } as unknown as TransferReport;

        case 'vacation':
          return {
            id: r.id,
            type: 'vacation',
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            fromPersonId: r.fromPersonId,
            toPersonId: r.toPersonId,
            status: r.status,
            decisionReason: r.decisionReason,
            assignedToPersonId: r.assignedToPersonId,
            decidedByPersonId: r.decidedByPersonId,
            description: r.description,
            vacationFrom: r.vacationFrom!,
            vacationTo: r.vacationTo!,
            vacationReason: r.vacationReason!,
          } as unknown as VacationReport;

        default:
          throw new Error('Unknown report type: ' + r.type);
      }
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('No Reports found', e.message);
    } else {
      console.log('No Reports found', e);
    }
    return null;
  }
};
