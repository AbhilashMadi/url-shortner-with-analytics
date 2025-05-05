import type { FastifyReply, FastifyRequest } from "fastify";
import { type CreateUrlInput } from "@root/src/dtos/url.dto.js";

import { generateAlias } from "@/utils/generators.js";
import urlRepository from "@/repositories/url.repository.js";
import HttpStatusCodes from "@/utils/http-status-codes.js";

const createUrlController = async function (
  request: FastifyRequest<{ Body: CreateUrlInput }>,
  reply: FastifyReply
) {
  const {
    original_url,
    alias: userProvidedAlias,
    expires_at,
    tags = [],
    utm,
  } = request.body;

  const normalizedUrl = original_url.trim().toLowerCase();

  // Case 1: User provided alias — check if it already exists
  if (userProvidedAlias) {
    const existing = await urlRepository.getUrlByAlias(userProvidedAlias);

    if (existing) {
      return reply
        .status(HttpStatusCodes.CONFLICT)
        .fail("Alias already exists. Please choose a different one.", {}, HttpStatusCodes.CONFLICT);
    }

    const newUrl = await urlRepository.createUrl(original_url, userProvidedAlias);
    return reply.success("Short URL created", newUrl.toJSON(), HttpStatusCodes.CREATED);
  }

  // Case 2: Alias not provided — check if original URL already shortened
  const existing = await urlRepository.findUrlByOriginalUrl(normalizedUrl);
  if (existing) {
    return reply.success("Short URL already exists", existing);
  }

  // Case 3: Generate new alias and ensure it's unique
  let newAlias = generateAlias();
  while (await urlRepository.getUrlByAlias(newAlias)) {
    newAlias = generateAlias(); // retry on collision
  }

  const newUrl = await urlRepository.createUrl(
    normalizedUrl,
    newAlias,
    expires_at ? new Date(expires_at) : undefined,
    "",
    utm,
    tags);

  return reply.success("Short URL created", newUrl);
};

export default createUrlController;
