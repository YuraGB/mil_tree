import { ASSIGNMENT_ROLES, AWARDS, RANKS, STATUSES } from "@/constants";
import { person } from "@/db/schemas/auth-schema";

export type TDBPerson = typeof person.$inferSelect;

export type TPerson = Omit<TDBPerson, "createdAt" | "updatedAt">;

// status selector types
export type TStatusIcons =
  | "skull"
  | "bandage"
  | "alert"
  | "warning"
  | "question"
  | "ambulance"
  | "shield";

export type TStatusCodes =
  | "200" // KIA
  | "300" // WIA
  | "400" // Concussion
  | "500" // Insubordination
  | "600" // MIA
  | "700" // Evacuation
  | "800"; // Active

export interface IStatus {
  code: keyof typeof STATUSES;
  description: string;
  icon: string;
  color: string;
}

// Ranks
export type TRank = (typeof RANKS)[number];

// Awards
export type TAwardName = (typeof AWARDS)[number]["name"];

export interface IAward {
  name: TAwardName;
  title: string;
  description: string;
  icon: string; // emoji or url
  category: "State" | "MOD" | "GeneralStaff" | "Command" | "Unit";
}

export type AssignmentRole =
  (typeof ASSIGNMENT_ROLES)[keyof typeof ASSIGNMENT_ROLES];

export type PersonNode = {
  id: string;
  name: string;
  rank: TRank;
  statusCode: TStatusCodes;
  assignmentRole: AssignmentRole;
  unitId: string;
  commanderId: string | null;
};

export type OverviewPersonNode = {
  id: string;
  name: string;
  rank: TRank;
  subordinates: OverviewPersonNode[];
  statusCode: TStatusCodes;
  assignmentRole: AssignmentRole;
  awards: TAwardName | [];
};
