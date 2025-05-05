import type { Mongoose } from "mongoose"

declare module "fastify" {
  interface FastifyInstance {
    mongoose: Mongoose;
  }

  interface FastifyRequest { }

  interface FastifyReply {
    success<T>(message: string, data: T, statusCode?: number): FastifyReply;
    fail<T>(message: string, error: T, statusCode?: number): FastifyReply;
  }
}
