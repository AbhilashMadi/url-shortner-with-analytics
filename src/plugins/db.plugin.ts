import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import mongoose from "mongoose";

import envConfig from "@/configs/env.config.js";

// MongoDB plugin for Fastify
const dbPlugin: FastifyPluginAsync = fp(async (fastify) => {
  try {
    await mongoose.connect(envConfig.DB_URL, {
      dbName: envConfig.DB_NAME,
    });

    fastify.log.info("- MongoDB Connected Successfully!");

    mongoose.connection.on("connected", () => {
      fastify.log.info("- MongoDB Connection Established");
    });

    mongoose.connection.on("error", (err) => {
      fastify.log.error("- MongoDB Connection Error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      fastify.log.warn("MongoDB Disconnected!");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      fastify.log.info("- MongoDB Disconnected due to app termination");
      process.exit(0);
    });

    fastify.decorate("mongoose", mongoose);
  } catch (error) {
    fastify.log.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
});

export default dbPlugin;
