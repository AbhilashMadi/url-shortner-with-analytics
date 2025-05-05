import { z } from "zod";

const envSchema = z.object({
  // Server variables
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().min(1),
  HOST: z.string(),

  // Database variables
  DB_URL: z.string(),
  DB_NAME: z.string(),
})

// Parse and validate environment variables
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

// Extract validated environment variables
const envConfig = parsed.data;

// Export the environment configuration
export type EnvConfig = z.infer<typeof envSchema>;
export default envConfig;
