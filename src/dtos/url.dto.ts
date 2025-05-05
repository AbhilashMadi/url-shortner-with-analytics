import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import ErrorMessages from "@/utils/error-messages.js";
import RegexPatterns from "@/utils/regex-patterns.js";

// --- Create URL Schema ---
export const createUrlDTOSchema = z.object({
  original_url: z
    .string({ required_error: ErrorMessages.required("Original URL") })
    .url({ message: ErrorMessages.url }),

  alias: z
    .string()
    .min(3, { message: ErrorMessages.minLength("Alias", 3) })
    .max(30, { message: ErrorMessages.maxLength("Alias", 30) })
    .regex(RegexPatterns.ALIAS, { message: ErrorMessages.alias })
    .optional(),

  expires_at: z
    .string()
    .datetime({ message: ErrorMessages.date })
    .optional(),

  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
    })
    .optional(),

  tags: z.array(z.string()).optional(),
});

// --- Update URL Schema ---
export const updateUrlDTOSchema = createUrlDTOSchema
  .omit({ alias: true }) // exclude alias from update
  .partial();            // make all remaining fields optional

// --- Get URL Details Schema ---
export const urlAliasParamsSchema = z.object({
  alias: z
    .string({ required_error: ErrorMessages.required("Short URL alias") })
    .min(6, { message: ErrorMessages.minLength("Alias", 6) })
    .max(6, { message: ErrorMessages.maxLength("Alias", 6) })
});

// --- Type Inference ---
export type CreateUrlInput = z.infer<typeof createUrlDTOSchema>;
export type UpdateUrlInput = z.infer<typeof updateUrlDTOSchema>;
export type UrlAliasParamsInput = z.infer<typeof urlAliasParamsSchema>;

// --- JSON Schema for Swagger/OpenAPI Docs ---
const UrlRouteSchemas = {
  createSchema: {
    summary: "Create a new short URL",
    tags: ["url"],
    body: zodToJsonSchema(createUrlDTOSchema),
  },
  getSchema: {
    summary: "Get URL by alias",
    tags: ["url"],
    params: zodToJsonSchema(urlAliasParamsSchema),
  },
  updateSchema: {
    summary: "Update a short URL",
    tags: ["url"],
    body: zodToJsonSchema(updateUrlDTOSchema),
  },
  deleteSchema: {
    summary: "Delete a short URL",
    tags: ["url"],
    params: zodToJsonSchema(urlAliasParamsSchema),
  },
};

export default UrlRouteSchemas;
