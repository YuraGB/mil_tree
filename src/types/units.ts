import { unit } from "@/db/schemas/unit";
import { OverviewPersonNode, PersonNode, TPerson } from "./persons";

export type TDBUnit = typeof unit.$inferSelect;

export type TUnit = Omit<TDBUnit, "createdAt" | "updatedAt">;

export type UnitType =
  | "brigade"
  | "staff"
  | "battalion"
  | "company"
  | "platoon"
  | "squad"
  | "section";

export interface IUnitMeta {
  type: UnitType;
  name: string;
}

export interface IBrigadeTree {
  unitType: "brigade";
  name: string;
  commander: TPerson;
}

export type UnitNode = {
  id: string;
  name: string;
  unitType: UnitType;
  commander: PersonNode | null;
  personnel: PersonNode[];

  subUnits: UnitNode[];
};

export type OverviewUnitNode = {
  id: string;
  name: string;
  unitType: UnitType;
  commander?: OverviewPersonNode | null;
  subUnits: OverviewUnitNode[];
};
