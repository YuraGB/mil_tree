import { TreeNode } from '@/types';

// -----------------------------
// 1. Клонування дерева
// -----------------------------
function cloneTree(root: TreeNode): TreeNode {
  return structuredClone(root);
}

// -----------------------------
// 2. Видалення вузла
// -----------------------------
function removeNode(
  root: TreeNode,
  fromId: string,
): { updated: TreeNode; removed: TreeNode | null } {
  const copy = cloneTree(root);
  let removed: TreeNode | null = null;

  function dfs(node: TreeNode): boolean {
    // subordinates
    if ('subordinates' in node && node.subordinates) {
      const idx = node.subordinates.findIndex((c) => c.id === fromId);
      if (idx !== -1) {
        removed = node.subordinates.splice(idx, 1)[0];
        return true;
      }
      for (const child of node.subordinates) {
        if (dfs(child)) return true;
      }
    }

    // commander
    if ('commander' in node && node.commander?.id === fromId) {
      removed = node.commander;
      node.commander = undefined;
      return true;
    }

    return false;
  }

  dfs(copy);
  return { updated: copy, removed };
}

// -----------------------------
// 3. Перевірка циклу — чи вставляємо вузол у власне піддерево
// -----------------------------
function isInsideSubtree(node: TreeNode, targetId: string): boolean {
  if (node.id === targetId) return true;
  if ('commander' in node && node.commander?.id === targetId) return true;

  if ('subordinates' in node && node.subordinates) {
    return node.subordinates.some((c) => isInsideSubtree(c, targetId));
  }
  return false;
}

// -----------------------------
// 4. Вставка всередину або відносно toId
// -----------------------------
function insertNode(
  root: TreeNode,
  moving: TreeNode,
  toId: string,
  position: 'above' | 'below' | 'inside',
): boolean {
  function dfs(node: TreeNode): boolean {
    // Вставка inside
    if (node.id === toId && position === 'inside') {
      if ('subordinates' in node) {
        node.subordinates = node.subordinates || [];
        node.subordinates.push(moving);
        return true;
      }
    }

    // commander insert inside
    if ('commander' in node && node.commander?.id === toId) {
      if (position === 'inside' && 'subordinates' in node) {
        node.subordinates = node.subordinates || [];
        node.subordinates.push(moving);
        return true;
      }
    }

    // subordinates
    if ('subordinates' in node && node.subordinates) {
      for (let i = 0; i < node.subordinates.length; i++) {
        const child = node.subordinates[i];

        if (child.id === toId) {
          if (position === 'above') {
            node.subordinates.splice(i, 0, moving);
            return true;
          }
          if (position === 'below') {
            node.subordinates.splice(i + 1, 0, moving);
            return true;
          }

          if (position === 'inside' && 'subordinates' in child) {
            child.subordinates = child.subordinates || [];
            child.subordinates.push(moving);
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
  root: TreeNode,
  moving: TreeNode,
  toId: string,
  position: 'above' | 'below',
): boolean {
  function dfs(node: TreeNode): boolean {
    if ('subordinates' in node && node.subordinates) {
      for (let i = 0; i < node.subordinates.length; i++) {
        const child = node.subordinates[i];
        if (child.id === toId) {
          if (position === 'above') {
            node.subordinates.splice(i, 0, moving);
            return true;
          }
          if (position === 'below') {
            node.subordinates.splice(i + 1, 0, moving);
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
  root: TreeNode,
  fromId: string,
  toId: string,
  position: 'above' | 'below' | 'inside',
): TreeNode | null {
  // root не можна переносити
  if (
    root.id === fromId ||
    ('commander' in root && root.commander?.id === fromId)
  ) {
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
