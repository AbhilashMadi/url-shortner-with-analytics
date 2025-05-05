import type { FastifyInstance } from "fastify";

const indexRoutes = async function (app: FastifyInstance) {
  // Redirect to the original URL
  app.get("/:alias", () => null);
}

export default indexRoutes;