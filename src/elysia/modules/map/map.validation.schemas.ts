import { MARK_TYPES } from "@/constants";
import z from "zod";

export const MarkCoordinatesSchema = z.tuple([z.number(), z.number()]);

export const LineStringCoordinatesSchema = z.array(MarkCoordinatesSchema); // LineString
export const PolygonCoordinatesSchema = z.array(LineStringCoordinatesSchema); // Polygon

export const CircleCoordinatesSchema = z.object({
  center: MarkCoordinatesSchema,
  radius: z.number(),
});

export const CoordinatesSchema = z.union([
  MarkCoordinatesSchema, // Point
  LineStringCoordinatesSchema, // LineString
  PolygonCoordinatesSchema, // Polygon
  CircleCoordinatesSchema, // Circle
]);

export const createUpdateMarkSchema = z.object({
  type: z.enum(MARK_TYPES),
  id: z.string(),
  coordinates: CoordinatesSchema,
  properties: z.record(z.any(), z.any()),
});

export const deleteMarkSchema = z.object({
  id: z.string(),
});

const PointSchema = z.object({
  id: z.string(),
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
  properties: z
    .object({
      radius: z.number().optional(),
    })
    .default({}),
});

const PolygonSchema = z.object({
  id: z.string(),
  type: z.literal("Polygon"),
  coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
  properties: z.record(z.string(), z.any()),
});

const CircleSchema = z.object({
  id: z.string(),
  type: z.literal("Circle"),
  coordinates: z.object({
    center: z.tuple([z.number(), z.number()]),
    radius: z.number(),
  }),
  properties: z.record(z.string(), z.any()),
});

export const MarkSchema = z.discriminatedUnion("type", [
  PointSchema,
  PolygonSchema,
  CircleSchema,
]);
