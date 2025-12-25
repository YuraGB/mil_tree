import { IPerson, IUnitNode, TreeNode } from '@/types';
import { useState } from 'react';

export const useSearch = (data: TreeNode) => {
  const [results, setSearchResults] = useState<IPerson[]>([]);
  const findPerson = (value: string, person: IPerson): boolean => {
    return person.name.toLowerCase().includes(value.toLowerCase());
  };

  const searchSurf = (value: string, obj: TreeNode): IPerson[] => {
    if (value.length < 3) return [];
    const results: IPerson[] = [];

    // Якщо це Person
    if (isPerson(obj)) {
      if (findPerson(value, obj)) results.push(obj);

      // Перевіряємо підлеглих
      for (const sub of obj.subordinates) {
        results.push(...searchSurf(value, sub));
      }

      return results;
    }

    // Якщо це UnitNode
    if (isUnitNode(obj)) {
      // Перевіряємо командира
      if (obj.commander && findPerson(value, obj.commander)) {
        results.push(obj.commander);
      }

      // Перевіряємо підлеглих unit
      for (const sub of obj.subordinates) {
        results.push(...searchSurf(value, sub));
      }

      return results;
    }

    return results;
  };

  function isUnitNode(node: TreeNode): node is IUnitNode {
    return 'commander' in node;
  }

  function isPerson(node: TreeNode): node is IPerson {
    return 'rank' in node;
  }

  const onSearchChange = (value: string) => {
    return setSearchResults(searchSurf(value, data));
  };

  return { onSearchChange, results };
};
