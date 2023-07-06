import { URLModel, URLDoc } from "../models/URL.models";
import CONFIG from "../config/environment";
import axios from "axios";

export const clickDetails = async (
  ipAddress: string,
  userAgent: string | undefined,
  shortCode: string
): Promise<URLDoc> => {
  const URL = await URLModel.findOne({ shortCode });

  if (!URL) {
    // return res.status(404).json({ msg: "URL not found" });
    throw new Error("URL not found");
  }

  // Use an IP geolocation service API to get location data
  const geolocationResponse = await axios.get(
    `https://api.ip2location.io/?key=${
      CONFIG.GEO_API_KEY as string
    }&ip=${ipAddress}`
  );

  // Extract relevant location information from the response
  const {
    county_code: countryCode,
    country_name: country,
    region_name: region,
    city_name: city,
    latitude,
    longitude,
    zip_code: zipCode,
    time_zone: timeZone,
  } = geolocationResponse.data;

  // Store the click information in the URL document
  URL.clicks.push({
    userAgent,
    countryCode,
    country,
    region,
    city,
    latitude,
    longitude,
    zipCode,
    timeZone,
  });
  await URL.save();

  return URL;
};
