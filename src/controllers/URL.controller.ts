import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { URLModel, URLDoc } from "../models/URL.models";
import { IURLInput, URLCreateDetails, cachedShortURL } from "../dto/URL.dto";
import shortid from "shortid";
import CONFIG from "../config/environment";
import { UserModel } from "../models/User.models";
import axios from "axios";
import {
  renderRedis,
  getValuesFromRedis,
  setValuesInRedis,
} from "../config/redisConfig";
import { clickDetails } from "../utility/clickDetails";

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
  const { originalURL, customDomain } = req.body;

  try {
    // Check if the URL already exists in the cache
    const cachedShortURL = await getValuesFromRedis(originalURL);

    if (Object.keys(cachedShortURL as object).length !== 0) {
      // Return the cached short URL
      return res.status(200).send(cachedShortURL);
    } else {
      // Generate a short code using shortid
      const shortCode = shortid.generate();

      let shortURL: string;
      if (customDomain) {
        shortURL = `https://${customDomain}/${shortCode}`;
      } else {
        shortURL = `${CONFIG.BASE_URL}/${shortCode}`;
      }

      // Generate QR code using QRCode Monkey API
      const apiUrl = "https://api.qrcode-monkey.com/qr/custom";
      const qrCodePayload = {
        data: shortURL,
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

      let URLCreatedetails: URLCreateDetails = { originalURL, shortCode };
      if (customDomain) {
        URLCreatedetails.customDomain = customDomain;
      }
      if (qrCodeImage) {
        URLCreatedetails.qrCodeImage = qrCodeImage;
      }

      // // Save the URL mapping to the database
      await URLModel.create(URLCreatedetails);

      // push url to user's url history
      const user = await UserModel.findOne({ _id: req.user.id });
      user!.URLs.push(shortURL);
      await user!.save();

      // Store the shortened URL in the cache
      const value = await setValuesInRedis(originalURL, {
        shortCode,
        qrCodeImage,
      });
      console.log("Value set successfully", value);

      // Return the short URL and QR code download link
      res.status(201).send({ shortURL, qrCodeDownloadLink: qrCodeImage });
    }
  } catch (error: any) {
    res.status(500).send({ msg: "Something went wrong! Please try again" });
  }
};

/**
 * @description redirect to Original URL
 * @method GET
 * @route /api/shortner/:shortCode
 * @access public
 */
export const getOriginalURL = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  try {
    // Check if the short URL exists in the cache
    const cachedOriginalURL = await getValuesFromRedis(shortCode);

    // Track the click
    const { "user-agent": userAgent } = req.headers;

    // Get the user's IP address
    const ipAddress = req.ip;
    let URL: URLDoc;
    if (Object.keys(cachedOriginalURL as object).length !== 0) {
      // Redirect to the original URL from the cache
      res.redirect((cachedOriginalURL as any).originalURL);

      await clickDetails(ipAddress, userAgent, shortCode);
    } else {
      // Find the URL mapping in the database
      URL = await clickDetails(ipAddress, userAgent, shortCode);

      // Store the original URL in the cache
      const value = await setValuesInRedis(shortCode, {
        originalURL: URL.originalURL,
        qrCodeImage: URL.qrCodeImage,
      });
      console.log("Value set successfully", value);

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
      return res.status(404).json({ msg: "URL not found" });
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
    const user = await UserModel.findOne({ _id: req.user.id })
      .populate("URLs")
      .exec();

    if (user?.URLs.length === 0) {
      return res.status(404).json({ msg: "user has no URL history" });
    }

    // Return the analytics data
    res.status(200).send({ history: user?.URLs });
  } catch (error: any) {
    res.status(500).send({ msg: "Something went wrong! Please try again" });
  }
};
