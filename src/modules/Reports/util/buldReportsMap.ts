import { TDBPerson } from '@/types/persons';
import { Report, TReportView } from '@/types/reports';

export const buildReportsColumns = (
  reports: Report[],
  persons: TDBPerson[],
): TReportView[] => {
  const personsMap = new Map(persons.map((p) => [p.id, p]));

  const grouped = new Map<string, Report[]>();

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
