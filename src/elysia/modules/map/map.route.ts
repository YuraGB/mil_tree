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

// Routes
export const mapRoutes = new Elysia({
  name: "map_routes",
})
  // Handler
  .get("/map", async () => {
    return await getAllMarkTypes();
  })
  .post(
    "/createMapMark",
    // Handler
    ({ body }) => {
      return saveMark(body);
    },
    // Validation schema
    {
      body: createUpdateMarkSchema,
    }
  )
  .put(
    "/updateMarks",
    async ({ body }) => {
      return await updateMark(body);
    },
    // Validation schema
    {
      body: createUpdateMarkSchema,
    }
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
    }
  );
