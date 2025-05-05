import type { FastifyInstance } from "fastify";

import createUrlController from "@root/src/controllers/create-ur.controller.js";
import UrlRouteSchemas from "@root/src/dtos/url.dto.js";

export default async function urlRoutes(app: FastifyInstance) {
  // Create new short URL (except alias)
  app.post("/",
    { schema: UrlRouteSchemas.createSchema },
    createUrlController);

  // Get Url details by alias
  app.get("/:alias",
    { schema: UrlRouteSchemas.getSchema },
    () => "--");

  // Update existing short URL
  app.patch("/:alias",
    { schema: UrlRouteSchemas.updateSchema },
    () => null);

  // Delete existing short URL
  app.delete("/:alias",
    { schema: UrlRouteSchemas.deleteSchema },
    () => null);
}
