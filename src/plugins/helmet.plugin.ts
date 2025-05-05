import helmet from "@fastify/helmet";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const helmetPlugin = fp(async function (app: FastifyInstance) {
  app.register(helmet);

  app.log.info("- HELMET plugin registered successfully!")
})

export default helmetPlugin;