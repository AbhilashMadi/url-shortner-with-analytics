import type { FastifyReply, FastifyRequest } from "fastify";
import type { UpdateUrlInput, UrlAliasParamsInput } from "@/dtos/url.dto.js";

import urlRepository from "@/repositories/url.repository.js";
import HttpExceptionNames from "@/utils/http-error-names.js";
import HttpStatusCodes from "@/utils/http-status-codes.js";

const updateUrlByAlias = async function (
  request: FastifyRequest<{ Params: UrlAliasParamsInput, Body: UpdateUrlInput }>,
  reply: FastifyReply
) {
  const { alias } = request.params;
  // Validate the request body against the update URL schema
  // Find the URL document by alias
  const urlDoc = await urlRepository.getUrlByAlias(alias);

  if (!urlDoc) {
    return reply.fail(
      `No URL found for alias: ${alias}`,
      HttpExceptionNames.NOT_FOUND,
      HttpStatusCodes.NOT_FOUND)
  }

  // Update the URL document with the new data
  //@ts-ignore
  const updatedUrlDoc = await urlRepository.updateUrl(alias, request.body);
  return reply.success("URL successfully updated", updatedUrlDoc, HttpStatusCodes.OK);
};

export default updateUrlByAlias;
