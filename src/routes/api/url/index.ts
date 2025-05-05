import type { FastifyInstance } from "fastify";

import createUrlController from "@root/src/controllers/create-ur.controller.js";
import UrlRouteSchemas from "@root/src/dtos/url.dto.js";
import getUrlByAliasController from "@root/src/controllers/get-url-by-alias.controller.js";
import updateUrlByAlias from "@root/src/controllers/update-url-by-alias.js";
import delteUrlByAliasController from "@root/src/controllers/delete-url-by-alias.controller.js";

export default async function urlRoutes(app: FastifyInstance) {
  // Create new short URL (except alias)
  app.post("/",
    { schema: UrlRouteSchemas.createSchema },
    createUrlController);

  // Get Url details by alias
  app.get("/:alias",
    { schema: UrlRouteSchemas.getSchema },
    getUrlByAliasController);

  // Update existing short URL
  app.patch("/:alias",
    { schema: UrlRouteSchemas.updateSchema },
    updateUrlByAlias);

  // Delete existing short URL
  app.delete("/:alias",
    { schema: UrlRouteSchemas.deleteSchema },
    delteUrlByAliasController);
}
