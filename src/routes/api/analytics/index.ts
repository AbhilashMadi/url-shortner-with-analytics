import getAnalyticsByAliasController from "@root/src/controllers/get-analytics-by-alias.controller.js";
import { type FastifyInstance } from "fastify";

const analyticsRoutes = async function (app: FastifyInstance) {
  app.get("/:alias", getAnalyticsByAliasController);
}

export default analyticsRoutes;