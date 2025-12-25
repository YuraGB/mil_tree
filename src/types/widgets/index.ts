import {
  ASSIGNMENT_ROLES,
  AWARDS,
  AWARDSNAMES,
  RANKS,
  UNIT_TYPES,
  WIDGETS,
  STATUSES,
} from '@/constants';
import Quill, { Delta, Range } from 'quill';
import { ReactNode } from 'react';

// Пропси з типами Editor
export interface EditorProps {
  readOnly?: boolean;
  defaultValue?: Delta;
  onReady?: (quill: Quill) => void;
  onTextChange?: (
    delta: Delta,
    oldDelta: Delta,
    source: string, // source - це рядок
  ) => void;
  onSelectionChange?: (
    range: Range | null,
    oldRange: Range | null,
    source: string, // source - це рядок
  ) => void;
}

export interface EditorIndexProps {
  valueDefault?: Delta;
  handleSave?: (delta?: Delta) => void;
}

// Віджетні типи
export type Widget = {
  id: number; // унікальний id
  type: TWidgetNames; // тип віджета
  props?: {
    karmaValue?: number;
    [key: string]: any;
  }; // додаткові параметри
  createdAt: Date; // дата створення
};

export type WidgetContainerProps = {
  children?: ReactNode;
  widgetName: Widget['type'];
  widgetCreated?: Widget['createdAt'];
  widgetId: number;
  onRemoveHandler: (id: number) => void;
};

export interface IWidgetProps {
  widget: Widget;
  removeWidget: (id: number) => void;
  saveWidget: (id: number, props: any) => void;
}

export type TWidgetNames = (typeof WIDGETS)[number];

// status selector types
export type TStatusIcons =
  | 'skull'
  | 'bandage'
  | 'alert'
  | 'warning'
  | 'question'
  | 'ambulance'
  | 'shield';

export type TStatusCodes =
  | '200' // KIA
  | '300' // WIA
  | '400' // Concussion
  | '500' // Insubordination
  | '600' // MIA
  | '700' // Evacuation
  | '800'; // Active

export interface IStatus {
  code: keyof typeof STATUSES;
  description: string;
  icon: string;
  color: string;
}

// Ranks
export type TRank = (typeof RANKS)[number];

// Awards
export type TAwardName = (typeof AWARDS)[number]['name'];

export interface IAward {
  name: TAwardName;
  title: string;
  description: string;
  icon: string; // emoji or url
  category: 'State' | 'MOD' | 'GeneralStaff' | 'Command' | 'Unit';
}

export type AssignmentRole =
  (typeof ASSIGNMENT_ROLES)[keyof typeof ASSIGNMENT_ROLES];

export type TUNIT = (typeof UNIT_TYPES)[keyof typeof UNIT_TYPES];

export interface IUnitRef {
  type: TUNIT;
  name: string;
}

export interface IUNIT {
  id: string;
  name: string;
  commander?: ICommandPerson;

  rank: TRank;
  statusCode: IStatus['code'];

  assignmentRole: keyof typeof ASSIGNMENT_ROLES | 'soldier';

  awards: TAwardName[];

  unit: IUnitRef;

  subordinates: IUNIT[];
}

export interface ICommandPerson {
  id: string;
  name: string;

  rank: TRank;
  statusCode: IStatus['code'];

  assignmentRole: keyof typeof ASSIGNMENT_ROLES | 'soldier';
  subordinates: TreeNode[];
  awards: TAwardName[];
  unit: IUnitRef;
}

//-------------------------- Widget Types -------------------------//
// types.ts
export type UnitType =
  | 'brigade'
  | 'staff'
  | 'battalion'
  | 'company'
  | 'platoon'
  | 'squad'
  | 'section';

export interface IUnitMeta {
  type: UnitType;
  name: string;
}

export interface IPerson {
  id: string;
  name: string;
  rank: string;
  statusCode: IStatus['code'];
  assignmentRole: string;
  awards: string[];
  unit: IUnitMeta;
  subordinates: TreeNode[];
}

export interface IUnitNode {
  id: string;
  unit?: IUnitMeta;
  unitMeta?: IUnitMeta;
  name?: string;
  commander?: IPerson;
  subordinates: TreeNode[];
}

export type TreeNode = IPerson | IUnitNode;

export interface IBrigadeTree {
  unitType: 'brigade';
  unitName: string;
  commander: IPerson;
}
