import { PersonNode, TDBPerson, TRank } from "@/types/persons";
import { TDBUnit, UnitNode } from "@/types/units";

/**
 * buildUnitNode
 *
 * @param unitId string
 * @param unitMap Map
 * @param personsByUnit Map
 * @param personsByCommander Map
 * @returns UnitNode | null
 */
export function buildUnitNode(
  unitId: string,
  unitMap: Map<string, TDBUnit>,
  personsByUnit: Map<string, PersonNode[]>,
  personsByCommander: Map<string, PersonNode[]>,
): UnitNode | null {
  const unit = unitMap.get(unitId);
  if (!unit) return null;

  const commander = unit.commanderId
    ? (personsByUnit.get(unitId)?.find((p) => p.id === unit.commanderId) ??
      null)
    : null;

  const subUnits: UnitNode[] = [];

  for (const child of unitMap.values()) {
    // ❗ захист від self-parent
    if (child.parentUnitId === unitId && child.id !== unitId) {
      const node = buildUnitNode(
        child.id,
        unitMap,
        personsByUnit,
        personsByCommander,
      );
      if (node) subUnits.push(node);
    }
  }

  return {
    id: unit.id,
    name: unit.name,
    unitType: unit.unitType,
    commander,
    personnel: commander ? (personsByCommander.get(commander.id) ?? []) : [],
    subUnits,
  };
}

/**
 * indexById
 *
 * @param items Array
 * @returns Map
 */
export function indexById<T extends { id: string }>(items: T[]) {
  return new Map(items.map((i) => [i.id, i]));
}

/**
 * mapPerson
 * format data
 *
 * @param p TDBPerson
 * @returns PersonNode
 */
export function mapPerson(p: TDBPerson): PersonNode {
  return {
    id: p.id,
    unitId: p.unitId!,
    assignmentRole: p.assignmentRole,
    name: p.name,
    rank: p.rank as TRank,
    statusCode: p.statusCode,
    commanderId: p.commanderId,
  };
}
