import { TDBPerson } from '@/types/persons';
import { Report, TReportView } from '@/types/reports';

export const buildReportsMap = (
  reports: Report[],
  persons: TDBPerson[],
): { [name: string]: TReportView[] } => {
  const personsMap = new Map(persons.map((p) => [p.id, p]));

  return reports.reduce<{ [key: string]: TReportView[] }>((acc, r) => {
    const fromPerson = personsMap.get(r.fromPersonId);
    const toPerson = personsMap.get(r.toPersonId);

    const key = toPerson?.name || fromPerson?.name || r.status;

    if (!acc[key]) acc[key] = [];

    acc[key].push({
      ...r,
      fromPersonName: fromPerson?.name,
      fromPersonRank: fromPerson?.rank,
      toPersonName: toPerson?.name,
      toPersonRank: toPerson?.rank,
    });

    return acc;
  }, {});
};
