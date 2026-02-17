import { TPersonsRespons } from '@/types/persons';
import { ReportResponse, TReportAssigned, TRoot } from '@/types/reports';

// -----------------------------
// function cloneTree(root: TRoot): TRoot {
//   return structuredClone(root);
// }

// -----------------------------
// 2. Видалення вузла
// -----------------------------

function removeNode(
  root: TRoot,
  reportId: string,
  from: TReportAssigned,
): { updated: TRoot; removed: ReportResponse | null } {
  const columnIndex = root.findIndex((col) => col.person.id === from);
  if (columnIndex === -1) {
    return { updated: root, removed: null };
  }

  const column = root[columnIndex];
  const reportIndex = column.reports.findIndex((rep) => rep.id === reportId);

  if (reportIndex === -1) {
    return { updated: root, removed: null };
  }

  const removed = column.reports[reportIndex];

  // 🔥 Копіюємо тільки потрібні частини
  const updatedColumn = {
    ...column,
    reports: [
      ...column.reports.slice(0, reportIndex),
      ...column.reports.slice(reportIndex + 1),
    ],
  };

  const updatedRoot = [
    ...root.slice(0, columnIndex),
    updatedColumn,
    ...root.slice(columnIndex + 1),
  ];

  return { updated: updatedRoot, removed };
}

// -----------------------------
// 3. Вставка всередину або відносно toId
// -----------------------------
function insertNode(
  root: TRoot,
  report: ReportResponse,
  to: TReportAssigned,
): void {
  for (let i = 0; i <= root.length; i++) {
    if (root[i].person.id === to) {
      root[i].reports.push(report);
      break;
    }
  }
}

// -----------------------------
// 6. Головна функція moveNode
// -----------------------------
export function moveReport(
  current: ReportResponse,
  root: TRoot,
  from: TReportAssigned,
  to: TReportAssigned,
): TRoot | null {
  // if (from === to) return null;

  const { updated, removed } = removeNode(root, current.id, from);
  if (!removed) return null;

  const moved: ReportResponse = {
    ...removed,

    assignedToPersonId: to,
  };

  insertNode(updated, moved, to);

  return updated;
}

// helper function
export function findReport(
  root: TRoot,
  id: string,
): { report: ReportResponse; assigned: TPersonsRespons } | null {
  for (const { person, reports } of Object.values(root)) {
    const found = reports.find((r) => r.id === id);
    if (found) {
      return {
        report: found,
        assigned: person,
      };
    }
  }
  return null;
}
