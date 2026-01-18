import { MARK_TYPES } from "@/types/map";
import { Elysia } from "elysia";
import z from "zod";

export const MarkCoordinatesSchema = z.tuple([
  z.number({
    error: "Longitude must be a number",
  }),
  z.number({
    error: "Longitude must be a number",
  }),
]);

export const CoordinatesSchema = z.union([
  MarkCoordinatesSchema,
  z.array(MarkCoordinatesSchema),
  z.array(z.array(MarkCoordinatesSchema)),
]);

export const mapRoutes = new Elysia({
  name: "map_routes",
})
  .get("/map", () => {
    return { mapData: "data" };
  })
  .post(
    "/createMapMark",
    ({ body }) => {
      return body;
    },
    {
      body: z.object({
        type: z.enum(MARK_TYPES, { error: "Invalid mark type" }),
        id: z.string({ error: "id is required" }),
        coordinates: CoordinatesSchema,
      }),
    }
  )
  .put("/updateMarks", () => {
    return { mark: "updated" };
  })
  .delete("/deleteMarks", () => {
    return {
      markDeleted: true,
    };
  });
