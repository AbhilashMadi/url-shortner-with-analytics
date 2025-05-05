import type { FastifyReply, FastifyRequest } from "fastify";
import urlRepository from "@/repositories/url.repository.js";
import type { UrlAliasParamsInput } from "@/dtos/url.dto.js";
import HttpStatusCodes from "../utils/http-status-codes.js";
import HttpExceptionNames from "../utils/http-error-names.js";

const getUrlByAliasController = async function (
  request: FastifyRequest<{ Params: UrlAliasParamsInput }>,
  replay: FastifyReply,
) {
  // find the existing url document with given alias
  const { alias } = request.params;
  const urlDoc = await urlRepository.getUrlByAlias(alias);

  if (!urlDoc) {
    return replay.fail(
      `No URL found for alias: ${alias}`,
      { error: HttpExceptionNames.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND)
  }

  // If URL has expired, treat it as not found
  if (urlDoc.expires_at && new Date(urlDoc.expires_at) < new Date()) {
    return replay.fail(
      "This short URL has expired.",
      { error: HttpExceptionNames.GONE },
      HttpStatusCodes.GONE
    )
  }

  return replay.success("URL found", urlDoc)

}

export default getUrlByAliasController;