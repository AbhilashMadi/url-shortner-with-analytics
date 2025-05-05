import type { FastifyInstance } from "fastify";

export default async function urlRoutes(app: FastifyInstance) {
  // Get Url details by alias
  app.get("/:alias", () => "--");

  // Create new short URL (except alias)
  app.post("/", () => null);

  // Update existing short URL
  app.patch("/:alias", () => null);

  // Delete existing short URL
  app.delete("/:alias", () => null);
}
