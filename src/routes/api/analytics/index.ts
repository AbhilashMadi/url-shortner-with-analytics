import { type FastifyInstance } from "fastify";

const analyticsRoutes = async function (app: FastifyInstance) {
  app.get("/:alias", () => { });
}

export default analyticsRoutes;