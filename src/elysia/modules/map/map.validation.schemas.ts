import { MARK_TYPES } from "@/constants";
import z from "zod";

export const MarkCoordinatesSchema = z.tuple([z.number(), z.number()]);

export const CoordinatesSchema = z.union([
  MarkCoordinatesSchema,
  z.array(MarkCoordinatesSchema),
]);

export const createUpdateMarkSchema = z.object({
  type: z.literal(MARK_TYPES),
  id: z.string(),
  coordinates: CoordinatesSchema,
  properties: z.record(z.any(), z.any()),
});

export const deleteMarkSchema = z.object({
  id: z.string(),
});
