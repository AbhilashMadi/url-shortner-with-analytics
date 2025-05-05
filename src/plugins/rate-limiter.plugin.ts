import rateLimit, { type RateLimitOptions } from "@fastify/rate-limit";
import { type FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import HttpStatusCodes from "@/utils/http-status-codes.js";

const rateLimitOptions: RateLimitOptions = {
  max: 100,
  timeWindow: '15 minutes',
  cache: 1000,
  skipOnError: true,
  keyGenerator: (req) => req.ip,
  errorResponseBuilder: (_, context) => ({
    message: 'Rate limit exceeded, please try again later.',
    statusCode: HttpStatusCodes.TOO_MANY_REQUESTS,
    maxRequests: context.max,
  })
}

const rateLimiterPlugin = fp(async function (app: FastifyInstance) {
  app.register(rateLimit, rateLimitOptions);

  app.log.info("- Fastify Rate limit plugin registered successfully!");
});

export default rateLimiterPlugin;
