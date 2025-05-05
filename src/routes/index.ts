import indexRedirectController from "@/controllers/index-redirect.js";
import UrlRouteSchemas from "@/dtos/url.dto.js";
import type { FastifyInstance } from "fastify";

const indexRoutes = async function (app: FastifyInstance) {
  // Redirect to the original URL
  app.get("/:alias",
    { schema: UrlRouteSchemas.getSchema },
    indexRedirectController);
}

export default indexRoutes;