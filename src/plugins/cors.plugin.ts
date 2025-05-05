import cors, { type FastifyCorsOptions } from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const checkCorsOrigin = (
  origin: string | undefined,
  callback: (err: Error | null, allow: boolean) => void,
) => {
  const allowedOrigins = ["http://localhost:3000"];

  // Allow requests with no origin (like Postman, curl, mobile apps, etc.)
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin)) return callback(null, true);

  return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
};

const corsOptions: FastifyCorsOptions = {
  origin: checkCorsOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true,
  maxAge: 86400,
  optionsSuccessStatus: 204,
};

const corsPlugin = fp(async function (app: FastifyInstance) {
  // Registering the CORS plugin with options globally
  app.register(cors, corsOptions);

  app.log.info("- CORS plugin registered successfully!");
});

export default corsPlugin;
