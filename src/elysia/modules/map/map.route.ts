import { Elysia } from "elysia";

import {
  deleteMark,
  getAllMarkTypes,
  saveMark,
  updateMark,
} from "./map.service";
import {
  createUpdateMarkSchema,
  deleteMarkSchema,
} from "./map.validation.schemas";
import { formatMarkDataFromDb } from "@/lib/formatMarkDataFromDb";

// Routes
export const mapRoutes = new Elysia({
  name: "map_routes",
})
  // Handler
  .get("/map", async () => {
    const raw = await getAllMarkTypes();

    const { valid, invalid } = formatMarkDataFromDb(raw);

    if (invalid && invalid.length) {
      console.warn("Invalid map marks:", invalid);
    }

    return valid;
  })

  // Post Route
  .post(
    "/createMapMark",
    // Handler
    async ({ body }) => {
      return await saveMark(body);
    },
    // Validation schema
    {
      body: createUpdateMarkSchema,
    },
  )
  .put(
    "/updateMarks",
    async ({ body }) => {
      const updateMarks = await updateMark(body);

      const { valid, invalid } = formatMarkDataFromDb(updateMarks);
      return;
    },
    // Validation schema
    {
      body: createUpdateMarkSchema,
    },
  )
  .delete(
    "/deleteMarks",
    // Handler
    async ({ body }) => {
      return await deleteMark(body.id);
    },
    // Validation schema
    {
      body: deleteMarkSchema,
    },
  );
