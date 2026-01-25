import Elysia from "elysia";
import { rateLimiter } from "../rateLimiter";
import { overviewRoute } from "../overview/overview.route";
import { reportRoutes } from "../report/report.route";
import { personRoutes } from "../person/person.route";
import { mapRoutes } from "../map/map.route";

export const apiRoutesPath = new Elysia({ name: "api_routes_path" }).group(
  "/api",
  (api) => {
    return api
      .use(rateLimiter)
      .use(overviewRoute)
      .use(reportRoutes)
      .use(personRoutes)
      .use(mapRoutes);
  },
);
