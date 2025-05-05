import type { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import HttpStatusCodes from "../utils/http-status-codes.js";

// Base class for all responses
class CommonResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data: T | null,
    public statusCode: number,
    public timestamp: string = new Date().toISOString()
  ) { }
}

// Success response
class SuccessResponse<T> extends CommonResponse<T> {
  constructor(message: string, data: T, statusCode = 200) {
    super(true, message, data, statusCode);
  }
}

// Failed response
class FailedResponse<T> extends CommonResponse<T> {
  public error: T;
  constructor(message: string, error: T, statusCode = 400) {
    super(false, message, null, statusCode);
    this.error = error;
  }
}

const responsePlugin = fp(async function (app: FastifyInstance) {
  app.decorateReply('success', function <T>(
    this: FastifyReply,
    message: string,
    data: T,
    statusCode = HttpStatusCodes.OK
  ) {
    const response = new SuccessResponse<T>(message, data, statusCode);
    return this.status(statusCode).send(response);
  });

  app.decorateReply('fail', function <T>(
    this: FastifyReply,
    message: string,
    error: T,
    statusCode = HttpStatusCodes.BAD_REQUEST
  ) {
    const response = new FailedResponse<T>(message, error, statusCode);
    return this.status(statusCode).send(response);
  });

  app.log.info("- Response plugin registered successfully!");
});

export default responsePlugin;
