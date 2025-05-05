import Autoload from '@fastify/autoload';
import Fastify from 'fastify';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import envConfig from '@/configs/env.config.js';
import loggerConfig from '@/configs/logger.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Fastify({
  logger: loggerConfig[envConfig.NODE_ENV]
});

// Autoload plugins
await app.register(Autoload, {
  dir: join(__dirname, 'plugins')
});

// Autoload routes with a prefix
await app.register(Autoload, {
  dir: join(__dirname, 'routes'),
  // options: { prefix: '/api/v1' }
});

try {
  await app.listen({ port: envConfig.PORT, host: envConfig.HOST });
  console.info(`Server started on port ${envConfig.PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
