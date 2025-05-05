import type { FastifyBaseLogger } from "fastify";
import HttpStatusCodes from "./http-status-codes.js";

export interface IpApiResponse {
  ip: string;
  network: string;
  version: "IPv4" | "IPv6";
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export async function getGeoLocation(
  ip: string,
  logger?: FastifyBaseLogger
): Promise<IpApiResponse | null> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);

    if (!response.ok) {
      if (response.status === HttpStatusCodes.TOO_MANY_REQUESTS) {
        logger?.warn(`IP geolocation rate-limited for IP: ${ip}`);
      } else {
        logger?.error(`IP API failed: ${response.status} for IP: ${ip}`);
      }
      throw new Error(`IP API failed with status: ${response.status}`);
    }

    const data = (await response.json()) as IpApiResponse;
    return data;
  } catch (err) {
    logger?.warn({ err }, `IP geolocation failed for IP: ${ip}`);
    // You can optionally return fallback data here if you want
    return null;
  }
}
