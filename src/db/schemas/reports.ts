import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { person } from "./auth-schema";
import { TReportStatus, TReportType } from "@/types/reports";

export const report = pgTable("report", {
  id: varchar("id", { length: 20 }).primaryKey(),

  type: varchar("report_type").$type<TReportType>().notNull(),

  fromPersonId: varchar("from_person_id", { length: 20 })
    .notNull()
    .references(() => person.id),

  toPersonId: varchar("to_person_id", { length: 20 })
    .notNull()
    .references(() => person.id),

  status: varchar("status").$type<TReportStatus>().notNull().default("created"),

  assignedToPersonId: varchar("assigned_to_person_id", {
    length: 20,
  }).references(() => person.id),

  decidedByPersonId: varchar("decided_by_person_id", { length: 20 }).references(
    () => person.id,
  ),

  transferFrom: varchar("transfer_from", { length: 100 }),
  transferTo: varchar("transfer_to", { length: 100 }),

  description: text("description"),

  decisionReason: text("decision_reason"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// --------------------------------------
export const medicalReport = pgTable("medical_report", {
  reportId: varchar("report_id", { length: 20 })
    .primaryKey()
    .references(() => report.id, { onDelete: "cascade" }),

  diagnosis: text("diagnosis").notNull(),
  treatment: text("treatment").notNull(),
});

// --------------------------------------
export const releaseReport = pgTable("release_report", {
  reportId: varchar("report_id", { length: 20 })
    .primaryKey()
    .references(() => report.id, { onDelete: "cascade" }),

  releaseDate: timestamp("release_date", { withTimezone: true }).notNull(),
  releaseReason: text("release_reason").notNull(),
});

// --------------------------------------
export const transferReport = pgTable("transfer_report", {
  reportId: varchar("report_id", { length: 20 })
    .primaryKey()
    .references(() => report.id, { onDelete: "cascade" }),

  transferFromReport: varchar("transfer_from_report", {
    length: 100,
  }).notNull(),
  transferToReport: varchar("transfer_to_report", { length: 100 }).notNull(),
  reason: text("reason").notNull(),
});

export const vacationReport = pgTable("vacation_report", {
  reportId: varchar("report_id", { length: 20 })
    .primaryKey()
    .references(() => report.id, { onDelete: "cascade" }),

  vacationFrom: timestamp("vacation_from", { withTimezone: true }).notNull(),
  vacationTo: timestamp("vacation_to", { withTimezone: true }).notNull(),
  reason: text("reason").notNull(),
});
