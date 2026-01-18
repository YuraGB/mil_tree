import { Report, TReportAssigned, TRoot } from "@/types/reports";

// -----------------------------
function cloneTree(root: TRoot): TRoot {
  return structuredClone(root);
}

// -----------------------------
// 2. Видалення вузла
// -----------------------------

function removeNode(
  root: TRoot,
  reportId: string,
  from: TReportAssigned,
): { updated: TRoot; removed: Report | null } {
  const copy = cloneTree(root);
  const idx = copy[from].findIndex((r) => r.id === reportId);

  if (idx === -1) {
    return { updated: copy, removed: null };
  }

  const [removed] = copy[from].splice(idx, 1);
  return { updated: copy, removed };
}

// -----------------------------
// 3. Вставка всередину або відносно toId
// -----------------------------
function insertNode(root: TRoot, report: Report, to: TReportAssigned): void {
  root[to].push(report);
}

// -----------------------------
// 6. Головна функція moveNode
// -----------------------------
export function moveReport(
  current: Report,
  root: TRoot,
  from: TReportAssigned,
  to: TReportAssigned,
): TRoot | null {
  // if (from === to) return null;

  const { updated, removed } = removeNode(root, current.id, from);
  if (!removed) return null;

  const moved: Report = {
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
): { report: Report; assigned: TReportAssigned } | null {
  for (const [assigned, reports] of Object.entries(root)) {
    const found = reports.find((r) => r.id === id);
    if (found) {
      return {
        report: found,
        assigned: assigned as TReportAssigned,
      };
    }
  }
  return null;
}
