import { getAllPersons } from '@/elysia/modules/person/person.service';
import { getAllUnits } from '@/elysia/modules/unit/unit.service';
import { PersonNode } from '@/types/persons';
import { buildUnitNode, indexById, mapPerson } from './utils.ts';

/**
 * getOverview
 * Gets units and persons and build tree for front end
 *
 *
 * @param rootUnitId {string}
 * @returns UnitNode | null Tree
 */
export const getOverview = async (rootUnitId: string) => {
  const [units, persons] = await Promise.all([getAllUnits(), getAllPersons()]);

  if (!units?.length || !persons) return null;

  const unitMap = indexById(units);
  const personsByUnit = new Map<string, PersonNode[]>();
  const personsByCommander = new Map<string, PersonNode[]>();

  for (const p of persons) {
    if (p.unitId) {
      const arr = personsByUnit.get(p.unitId) ?? [];
      arr.push(mapPerson(p));
      personsByUnit.set(p.unitId, arr);
    }

    if (p.commanderId) {
      const arr = personsByCommander.get(p.commanderId) ?? [];
      arr.push(mapPerson(p));
      personsByCommander.set(p.commanderId, arr);
    }
  }

  // Build unit tree for front end
  return buildUnitNode(rootUnitId, unitMap, personsByUnit, personsByCommander);
};
