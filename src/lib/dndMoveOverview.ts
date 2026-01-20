import { UnitNode } from '@/types/units';

// -----------------------------
// 1. Клонування дерева
// -----------------------------
function cloneTree(root: UnitNode): UnitNode {
  return structuredClone(root);
}

// -----------------------------
// 2. Видалення вузла
// -----------------------------
function removeNode(
  root: UnitNode,
  fromId: string,
): { updated: UnitNode; removed: UnitNode | null } {
  const copy = cloneTree(root);
  let removed: UnitNode | null = null;

  function dfs(node: UnitNode): boolean {
    // subordinates
    if ('subUnits' in node && node.subUnits) {
      const idx = node.subUnits.findIndex((c) => c.id === fromId);
      if (idx !== -1) {
        removed = node.subUnits.splice(idx, 1)[0];
        return true;
      }
      for (const child of node.subUnits) {
        if (dfs(child)) return true;
      }
    }

    // commander
    // if ('commander' in node && node.commander?.id === fromId) {
    //   removed = node.commander;
    //   node.commander = undefined;
    //   return true;
    // }

    return false;
  }

  dfs(copy);
  return { updated: copy, removed };
}

// -----------------------------
// 3. Перевірка циклу — чи вставляємо вузол у власне піддерево
// -----------------------------
function isInsideSubtree(node: UnitNode, targetId: string): boolean {
  if (node.id === targetId) return true;
  if ('commander' in node && node.commander?.id === targetId) return true;

  if ('subUnits' in node && node.subUnits) {
    return node.subUnits.some((c) => isInsideSubtree(c, targetId));
  }
  return false;
}

// -----------------------------
// 4. Вставка всередину або відносно toId
// -----------------------------
function insertNode(
  root: UnitNode,
  moving: UnitNode,
  toId: string,
  position: 'above' | 'below' | 'inside',
): boolean {
  function dfs(node: UnitNode): boolean {
    // Вставка inside
    if (node.id === toId && position === 'inside') {
      if (node.subUnits.length) {
        node.subUnits = node.subUnits || [];
        node.subUnits.push(moving);
        return true;
      }
    }

    // commander insert inside
    if ('commander' in node && node.commander?.id === toId) {
      if (position === 'inside' && 'subUnits' in node) {
        node.subUnits = node.subUnits || [];
        node.subUnits.push(moving);
        return true;
      }
    }

    // subUnits
    if ('subUnits' in node && node.subUnits) {
      for (let i = 0; i < node.subUnits.length; i++) {
        const child = node.subUnits[i];

        if (child.id === toId) {
          if (position === 'above') {
            node.subUnits.splice(i, 0, moving);
            return true;
          }
          if (position === 'below') {
            node.subUnits.splice(i + 1, 0, moving);
            return true;
          }

          if (position === 'inside' && 'subUnits' in child) {
            child.subUnits = child.subUnits || [];
            child.subUnits.push(moving);
            return true;
          }
        }

        if (dfs(child)) return true;
      }
    }
    return false;
  }

  return dfs(root);
}

// -----------------------------
// 5. Вставка на рівні батька (above/below)
// -----------------------------
function insertAtParentLevel(
  root: UnitNode,
  moving: UnitNode,
  toId: string,
  position: 'above' | 'below',
): boolean {
  function dfs(node: UnitNode): boolean {
    if ('subUnits' in node && node.subUnits) {
      for (let i = 0; i < node.subUnits.length; i++) {
        const child = node.subUnits[i];
        if (child.id === toId) {
          if (position === 'above') {
            node.subUnits.splice(i, 0, moving);
            return true;
          }
          if (position === 'below') {
            node.subUnits.splice(i + 1, 0, moving);
            return true;
          }
        }

        if (dfs(child)) return true;
      }
    }
    return false;
  }

  return dfs(root);
}

// -----------------------------
// 6. Головна функція moveNode
// -----------------------------
export function moveNode(
  root: UnitNode,
  fromId: string,
  toId: string,
  position: 'above' | 'below' | 'inside',
): UnitNode | null {
  // root не можна переносити

  if (root.id === fromId) {
    return null;
  }

  // Видаляємо movingNode
  const { updated, removed } = removeNode(root, fromId);
  if (!removed) return null;

  // Перевірка на вставку всередину свого дерева
  if (isInsideSubtree(removed, toId)) return null;

  // Основна вставка
  const ok = insertNode(updated, removed, toId, position);

  // Якщо вставка всередину не відбулась — пробуємо вставити above/below через батька
  if (!ok && position !== 'inside') {
    if (!insertAtParentLevel(updated, removed, toId, position)) return null;
  }

  return updated;
}
