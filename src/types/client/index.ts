import { AssignmentRole, TAwardName, TRank, TStatusCodes } from "../persons";
import { TUnit } from "../units";

export interface Unit {
  type: TUnit;
  name: string;
}

export interface Person {
  id: string;
  name: string;
  rank: TRank;
  statusCode: TStatusCodes;
  assignmentRole: AssignmentRole | "soldier";
  awards: TAwardName[];
  unit: Unit;
  subordinates?: TreeNode[];
}

export interface CommandNode {
  id: string;
  unit?: Unit;
  unitMeta?: Unit;
  name?: string;
  commander?: Person;
  subordinates?: TreeNode[];
}

export type TreeNode = Person | CommandNode;

export interface BrigadeRoot {
  unitType: "brigade";
  unitName: string;
  commander: Person;
}

export type TSideBarLink = {
  url: string;
  text: string;
};
