// Ensure dotenv loads before anything else
import { z } from 'zod';
import { config } from 'dotenv';

config({ path: ".env.prod" })

// Define the schema for environment variables
const envSchema = z.object({
  // Server variables
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().min(1),

  // Database variables
  DB_URL: z.string().url(),
  DB_NAME: z.string().min(1),

  // Secrets
  IP_HASH_SECRET: z.string().min(1),
});

// Parse and validate environment variables
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

// Extract validated env vars
const envConfig = parsed.data;

export type EnvConfig = z.infer<typeof envSchema>;
export default envConfig;
