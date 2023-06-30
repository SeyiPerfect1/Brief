import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import URLModel from "../models/URL.models";
import { IURLInput } from "../dto/URL.dto";
import shortid from "shortid";
import CONFIG from "../config/environment";
import UserModel from "../models/User.models";
import axios from "axios";
import redisClient from "../config/redisConfig";
import { promisify } from "util";

/**
 * @description shorten URL
 * @method POST
 * @route /api/shortner
 * @access public
 */

export const inputURL = async (
  req: Request<{}, {}, IURLInput["body"]>,
  res: Response
) => {
  const { originalURL, customDomain, customPath } = req.body;

  const redisGetAsync = promisify(redisClient.get).bind(redisClient);
  const redisSetAsync = promisify(redisClient.set).bind(redisClient);

  try {
    // Check if the URL already exists in the cache
    const cachedShortURL = await redisGetAsync(originalURL);

    if (cachedShortURL) {
      // Return the cached short URL
      res.json({ shortUrl: cachedShortURL });
    } else {
      // Generate a short code using shortid
      const shortCode = shortid.generate();

      // Save the URL mapping to the database
      await URLModel.create({
        originalURL,
        shortCode,
        customDomain,
        customPath,
      });

      // Store the shortened URL in the cache
      await redisSetAsync(
        originalURL,
        `http://${customDomain}/${customPath || shortCode}`
      );

      // Generate QR code using QRCode Monkey API
      const apiUrl = "https://api.qrcode-monkey.com/qr/custom";
      const qrCodePayload = {
        data: `${customDomain} || ${CONFIG.BASE_URL}/${customPath} || ${shortCode}`,
        config: {
          body: "square",
          eye: "frame13",
          eyeBall: "ball13",
          bgColor: "#FFFFFF",
          fgColor: "#000000",
        },
        size: 300,
      };

      // Make a request to the QR code generator API
      const response = await axios.post(apiUrl, qrCodePayload, {
        responseType: "arraybuffer",
      });

      // Convert the response data to base64
      const qrCodeImage = Buffer.from(response.data, "binary").toString(
        "base64"
      );

      // Return the short URL and QR code download link

      const user = await UserModel.findOne({ _id: req.user.id });

      let shortURL: string;
      if (customDomain && customPath) {
        shortURL = `https://${customDomain}/${customPath} || ${shortCode}`;
      } else {
        shortURL = `${CONFIG.BASE_URL}/${shortCode}`;
      }

      user?.URLs.push(shortURL);
      await user?.save();

      res.status(201).send({ shortURL, qrCodeDownloadLink: qrCodeImage });
    }
  } catch (error: any) {
    res.status(500).send({ msg: "Something went wrong! Please try again" });
  }
};

/**
 * @description redirect to Original URL
 * @method GET
 * @route /api/shortner/:shordcode
 * @access public
 */
export const getOriginalURL = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  const redisGetAsync = promisify(redisClient.get).bind(redisClient);
  const redisSetAsync = promisify(redisClient.set).bind(redisClient);

  try {
    // Check if the short URL exists in the cache
    const cachedOriginalURL = await redisGetAsync(shortCode);

    if (cachedOriginalURL) {
      // Redirect to the original URL from the cache
      res.redirect(cachedOriginalURL);
    } else {
      // Find the URL mapping in the database
      const URL = await URLModel.findOne({ shortCode });

      if (!URL) {
        return res.status(404).json({ error: "URL not found" });
      }

      // Track the click
      const { referer, "user-agent": userAgent } = req.headers;

      // Get the user's IP address
      const ipAddress = req.ip;

      // Use an IP geolocation service API to get location data
      const geolocationResponse = await axios.get(
        `https://geolocation-api.com/api/v1/${ipAddress}/geo`
      );

      // Extract relevant location information from the response
      const { country, city, latitude, longitude } = geolocationResponse.data;

      // Store the click information in the URL document
      URL.clicks.push({
        referer,
        userAgent,
        country,
        city,
        latitude,
        longitude,
      });
      await URL.save();

      // Store the original URL in the cache
      await redisSetAsync(shortCode, URL.originalURL);

      // Redirect to the original URL
      res.redirect(URL.originalURL);
    }
  } catch (error: any) {
    res.status(500).send({ msg: "Something went wrong! Please try again" });
  }
};

/**
 * @description get URL analytics
 * @method GET
 * @route /api/shortner/:shortcode/analytics
 * @access public
 */
export const getURLAnalytics = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  try {
    // Find the URL mapping in the database
    const URL = await URLModel.findOne({ shortCode });

    if (!URL) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Return the analytics data
    res.status(200).send({ clicks: URL.clicks });
  } catch (error: any) {
    res.status(500).send({ msg: "Something went wrong! Please try again" });
  }
};

/**
 * @description get URL analytics
 * @method GET
 * @route /api/shortner/history
 * @access public
 */
export const getUserURLHistory = async (req: Request, res: Response) => {
  try {
    // Find the URL mapping in the database
    const user = await UserModel.findOne({ _id: req.user.id });

    if (user?.URLs.length === 0) {
      return res.status(404).json({ msg: "user has no URL history" });
    }

    // Return the analytics data
    res.status(200).send({ history: user?.URLs });
  } catch (error: any) {
    res.status(500).send({ msg: "Something went wrong! Please try again" });
  }
};
