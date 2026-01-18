import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  foreignKey,
} from "drizzle-orm/pg-core";
import { unit } from "./unit";
import { AssignmentRole, IStatus, TRank } from "@/types/persons";

export const person = pgTable(
  "Person",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    commanderId: text("commander_id"),
    unitId: text("unit_id"),
    name: text("name").notNull(),
    rank: text("rank").$type<TRank>(),
    statusCode: text("status_code")
      .$type<IStatus["code"]>()
      .notNull()
      .default("800"),
    assignmentRole: text("assignment_role")
      .$type<AssignmentRole>()
      .notNull()
      .default("soldier"),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    // unitFk: foreignKey({
    //   columns: [table.unitId],
    //   foreignColumns: [unit.id],
    // }).onDelete('set null'),
    commanderFk: foreignKey({
      columns: [table.commanderId],
      foreignColumns: [table.id],
    }).onDelete("set null"),

    commanderIdx: index("idx_person_commander").on(table.commanderId),
    unitIdx: index("idx_unit_id").on(table.unitId),
    emailIdx: index("idx_person_email").on(table.email),
    personIdx: index("idx_person_id").on(table.id),
  }),
);

export const session = pgTable(
  "session",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => person.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_personId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => person.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const personRelations = relations(person, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),

  commander: one(person, {
    fields: [person.commanderId],
    references: [person.id],
    relationName: "person_commander", // 🔑 same as subordinates
  }),

  subordinates: many(person, {
    relationName: "person_commander",
  }),

  unit: one(unit, {
    fields: [person.unitId],
    references: [unit.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(person, {
    fields: [session.userId],
    references: [person.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(person, {
    fields: [account.userId],
    references: [person.id],
  }),
}));
