import { Elysia } from "elysia";
import { getAllReports } from "./report.service";

export const reportRoutes = new Elysia({
  name: "report_routes",
}).get("/reports", async () => {
  return await getAllReports();
});
