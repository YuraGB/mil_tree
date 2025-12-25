import {
  AssignmentRole,
  ICommandPerson,
  TAwardName,
  TRank,
  TStatusCodes,
  TUNIT,
} from '../widgets';

export type UnitComponentProps = ICommandPerson & {
  children?: React.ReactNode;
};

export interface Unit {
  type: TUNIT;
  name: string;
}

export interface Person {
  id: string;
  name: string;
  rank: TRank;
  statusCode: TStatusCodes;
  assignmentRole: AssignmentRole | 'soldier';
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
  unitType: 'brigade';
  unitName: string;
  commander: Person;
}

export type TSideBarLink = {
  url: string;
  text: string;
};
