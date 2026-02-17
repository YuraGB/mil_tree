import { TPersonsRespons } from '@/types/persons';
import { ReportResponse, TReportView } from '@/types/reports';

export const buildReportsColumns = (
  reports: ReportResponse[],
  persons: TPersonsRespons[],
): TReportView[] => {
  const personsMap = new Map(persons.map((p) => [p.id, p]));

  const grouped = new Map<string, ReportResponse[]>();

  for (const r of reports) {
    const personId = r.toPersonId ?? r.fromPersonId;
    if (!personId) continue;

    if (!grouped.has(personId)) {
      grouped.set(personId, []);
    }

    grouped.get(personId)!.push(r);
  }

  return [...grouped.entries()].map(([personId, reports]) => ({
    person: personsMap.get(personId)!,
    reports,
  }));
};
