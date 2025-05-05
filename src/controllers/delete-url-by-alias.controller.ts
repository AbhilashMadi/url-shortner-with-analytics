import type { FastifyReply, FastifyRequest } from "fastify";
import type { UrlAliasParamsInput } from "@/dtos/url.dto.js";

import urlRepository from "@/repositories/url.repository.js";
import HttpExceptionNames from "@/utils/http-error-names.js";
import HttpStatusCodes from "@/utils/http-status-codes.js";

const deleteUrlByAliasController = async function (
  request: FastifyRequest<{ Params: UrlAliasParamsInput }>,
  reply: FastifyReply
) {
  const { alias } = request.params;

  // Find the URL document by alias
  const urlDoc = await urlRepository.getUrlByAlias(alias);

  // If the URL is not found, return a 404
  if (!urlDoc) {
    return reply.fail(
      `No URL found for alias: ${alias}`,
      HttpExceptionNames.NOT_FOUND,
      HttpStatusCodes.NOT_FOUND)
  }

  // Delete the URL document from the database
  const deleted = await urlRepository.deleteUrl(alias);

  // Return a success message after successful deletion
  return reply.success(
    `URL with alias ${alias} successfully deleted.`,
    { ...urlDoc.toJSON(), deleted },
    HttpStatusCodes.OK)
};

export default deleteUrlByAliasController;
