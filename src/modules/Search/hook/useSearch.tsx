import { PersonNode } from '@/types/persons';
import { UnitNode } from '@/types/units';
import { useState } from 'react';

export const useSearch = (data: UnitNode) => {
  const [results, setSearchResults] = useState<PersonNode[]>([]);
  const findPerson = (value: string, person: PersonNode): boolean => {
    return person.name.toLowerCase().includes(value.toLowerCase());
  };

  const searchSurf = (value: string, obj: UnitNode): PersonNode[] => {
    if (value.length < 3) return [];
    const results: PersonNode[] = [];

    // Якщо це UnitNode
    if (isUnitNode(obj)) {
      // Перевіряємо командира
      if (obj.commander && findPerson(value, obj.commander)) {
        results.push(obj.commander);
      }

      // Перевіряємо підлеглих unit
      for (const sub of obj.subUnits) {
        results.push(...searchSurf(value, sub));
      }

      return results;
    }

    return results;
  };

  function isUnitNode(node: UnitNode) {
    return 'commander' in node;
  }

  const onSearchChange = (value: string) => {
    return setSearchResults(searchSurf(value, data));
  };

  return { onSearchChange, results };
};
