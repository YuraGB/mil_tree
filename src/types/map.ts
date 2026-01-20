import { MARK_TYPES } from "@/constants";
import { mapMarks } from "@/db/schemas/mapMarks";
import { MarkSchema } from "@/elysia/modules/map/map.validation.schemas";
import * as L from "leaflet";
import z from "zod";

export type TMArkTypes = (typeof MARK_TYPES)[number];

export type TMarkCoordinates = [number, number];

export type TMArkGeometry = z.infer<typeof MarkSchema>;

export type TMarkJson = {
  geometry: TMArkGeometry;
  type: "Feature";
  properties: object;
};

export type LayerWithMeta = L.Layer & {
  options: {
    serverId?: string;
  };
};

export type TDBMark = typeof mapMarks.$inferSelect;

export type TMark = Omit<TDBMark, "createdAt" | "updatedAt">;
export type ZodIssue = {
  path: (string | number)[];
  message: string;
  code: string;
  expected?: unknown;
};

export type ValidationErrorLike = {
  type: string;
  errors?: ZodIssue[];
  valueError?: ZodIssue;
};
