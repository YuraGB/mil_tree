import { createId } from "@paralleldrive/cuid2";
import { foreignKey, index, pgTable, text, unique } from "drizzle-orm/pg-core";
import { person } from "./auth-schema";
import { relations } from "drizzle-orm";
import { UnitType } from "@/types/units";

export const unit = pgTable(
  "unit",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("unit_name").notNull(),
    commanderId: text("commander_id"),
    unitType: text("unit_type").$type<UnitType>().notNull(),
    parentUnitId: text("parent_unit_id"),
  },
  (table) => ({
    commanderFk: foreignKey({
      columns: [table.commanderId],
      foreignColumns: [person.id],
    }).onDelete("set null"),
    parentUnitFk: foreignKey({
      columns: [table.parentUnitId],
      foreignColumns: [table.id],
    }).onDelete("cascade"),

    commanderIdx: index("idx_unit_commander").on(table.commanderId),
    parentUnitIdx: index("idx_unit_parent").on(table.parentUnitId),
  }),
);

export const brigade_unit = pgTable(
  "brigade_unit",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    unitType: text("unit_type").default("brigade"),
    unitName: text("name"),
    commanderId: text("commander_id"),
  },
  (table) => ({
    commanderFk: foreignKey({
      columns: [table.commanderId],
      foreignColumns: [person.id],
    }),

    commanderUnique: unique("uniq_brigade_commander").on(table.commanderId),
  }),
);

export const unitRelations = relations(unit, ({ one, many }) => ({
  commander: one(person, {
    fields: [unit.commanderId],
    references: [person.id],
  }),

  persons: many(person),
}));
