import type { PinoLoggerOptions } from "fastify/types/logger.js";
import type { EnvConfig } from "@/configs/env.config.js";

const loggerConfig: Record<EnvConfig["NODE_ENV"], PinoLoggerOptions | boolean> = {
  development: {
    // level: 'debug',
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        colorize: true,
        singleLine: false,
      },
    },
  },
  production: { level: "info" },
  test: false,
};

export default loggerConfig;
