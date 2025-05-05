import type { UrlAliasParamsInput } from "@/dtos/url.dto.js";
import type { FastifyReply, FastifyRequest } from "fastify";

import clickRepository from "@/repositories/click.repository.js";
import urlRepository from "@/repositories/url.repository.js";
import HttpStatusCodes from "@/utils/http-status-codes.js";

import { getDeviceType } from "@/utils/get-device-type.js";
import { getGeoLocation } from "@/utils/get-geolocation.js";
import { encryptIP } from "@/utils/crypto-utils.js";

const indexRedirectController = async function (
  request: FastifyRequest<{ Params: UrlAliasParamsInput }>,
  reply: FastifyReply,
) {
  const { alias } = request.params;

  const ip = request.ip;
  const userAgent = request.headers["user-agent"]!;
  const referrer = request.headers["referer"];

  let geolocation = { city: "", country: "", region: "" };
  try {
    const geolocation = await getGeoLocation(ip, request.log);
    request.log.debug(geolocation);
  } catch (err) {
    request.log.warn("Geo-location lookup failed", err);
  }

  const city = geolocation?.city || "";
  const country = geolocation?.country || "";
  const region = geolocation?.region || "";

  // Find the original URL document by alias
  const document = await urlRepository.getUrlByAlias(alias);

  if (!document) {
    return reply.redirect("/not-found", HttpStatusCodes.NOT_FOUND);
  }

  // Collect click analytics data
  const clickData = {
    alias,
    url_id: document._id,
    ip: encryptIP(ip),
    country,
    city,
    region,
    referrer,
    user_agent: userAgent,
    browser: getDeviceType(userAgent).browser,
    os: getDeviceType(userAgent).os,
    device_type: getDeviceType(userAgent).deviceType,
  };

  // Save the click analytics into the database
  //@ts-ignore
  await clickRepository.logClick(clickData);

  // Redirect to the original URL
  return reply.redirect(document.original_url);
};

export default indexRedirectController;
