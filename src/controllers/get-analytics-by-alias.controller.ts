import type { FastifyReply, FastifyRequest } from "fastify";

import type { UrlAliasParamsInput } from "@/dtos/url.dto.js";
import clickRepository from "@/repositories/click.repository.js";
import urlRepository from "@/repositories/url.repository.js";
import HttpExceptionNames from "@/utils/http-error-names.js";
import HttpStatusCodes from "@/utils/http-status-codes.js";

export default async function getAnalyticsByAliasController(
  request: FastifyRequest<{ Params: UrlAliasParamsInput }>,
  response: FastifyReply,
) {
  const { alias } = request.params;

  const aliasExist = await urlRepository.getUrlByAlias(alias);
  if (!aliasExist) {
    return response.fail(
      `No url exist with the given alias: ${alias}`,
      HttpExceptionNames.NOT_FOUND,
      HttpStatusCodes.NOT_FOUND);
  }

  const analytics = await clickRepository.getClickStatsByAlias(alias);

  return response.success(
    `Clicks for the shorted url: ${aliasExist.original_url}`,
    analytics,
    HttpStatusCodes.OK);
}