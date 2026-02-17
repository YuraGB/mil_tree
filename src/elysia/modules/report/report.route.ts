import { Elysia } from 'elysia';
import { createReport, getAllReports, updateReport } from './report.service';
import { createUpdateFormSchema } from '@/modules/Reports/util/formSchemas';
import z, { string, object, array } from 'zod';
import { ReportResponseSchema } from '@/types/reports';

export const reportRoutes = new Elysia({
  name: 'report_routes',
})
  // Get all reports
  .get(
    '/reports',
    async ({ status }) => {
      const reports = await getAllReports();

      const parsed = ReportResponseSchema.array().safeParse(reports);
      if (!parsed.success) {
        return status(422, { error: 'Wrong report format' });
      }

      return parsed.data;
    },

    // Validation responce
    {
      response: {
        200: array(ReportResponseSchema),
        422: object({ error: string() }),
      },
    },
  )
  // Create report
  .post(
    '/reports',

    // Handler
    async ({ body, status }) => {
      const createdReport = await createReport(body);
      if (!createdReport) {
        return status(400, {
          error: "Report wasn't creted",
        });
      }

      const parsed = ReportResponseSchema.safeParse(createdReport);

      if (!parsed.success) {
        return status(500, { error: 'Invalid created report format' });
      }

      return parsed.data;
    },

    // Validation request and Response
    {
      body: createUpdateFormSchema,
      response: {
        200: ReportResponseSchema,
        500: object({
          error: string(),
        }),
        400: object({
          error: string(),
        }),
      },
    },
  )
  // Update report
  .put(
    '/reports',
    async ({ body, status }) => {
      const updated = await updateReport(body);

      if (!updated)
        return status(400, { error: 'there was an error during update' });

      const parsed = ReportResponseSchema.safeParse(updated);

      if (!parsed.success) {
        return status(500, { error: 'Invalid updated report format' });
      }
      return parsed.data;
    },
    {
      body: createUpdateFormSchema.and(object({ id: string() })),
      response: {
        200: ReportResponseSchema,
        500: object({
          error: string(),
        }),
        400: object({
          error: string(),
        }),
      },
    },
  );
