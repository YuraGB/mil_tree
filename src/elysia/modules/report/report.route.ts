import { Elysia } from "elysia";
import { getAllReports } from "./report.service";
import { createUpdateFormSchema } from "@/modules/Reports/util/formSchemas";
import { string, object } from "zod";

export const reportRoutes = new Elysia({
  name: "report_routes",
})
  // Get all reports
  .get("/reports", async () => {
    return await getAllReports();
  })
  // Create report
  .post(
    "/reports",
    async ({ body }) => {
      console.log(body);
    },
    {
      body: createUpdateFormSchema,
    },
  )
  // Update report
  .put(
    "/reports",
    async ({ body }) => {
      console.log(body);
    },
    {
      // add id to the schema for update
      body: createUpdateFormSchema.and(object({ id: string() })),
    },
  );
