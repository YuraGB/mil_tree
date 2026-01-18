import { pgTable, uuid, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const mapMarks = pgTable("map_marks", {
  id: uuid("id").primaryKey().defaultRandom(),

  type: varchar("type", {
    enum: ["Point", "LineString", "Polygon", "Circle"],
  }).notNull(),

  coordinates: jsonb("coordinates").notNull(),
  /*
    coordinates = {
      [number, number], // for Point
      [ [number, number], ... ] // for LineString
      [ [number, number], ... ] // for Polygon
      { center: [number, number], radius: number } // for Circle
    }
  */

  properties: jsonb("properties").default({}),
  /*
    properties = {
      radius?: number,
      color?: string,
      serverId?: string,
      ...
    }
  */

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
