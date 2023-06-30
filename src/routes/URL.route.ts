import express from "express";
import {
  inputURL,
  getOriginalURL,
  getURLAnalytics,
  getUserURLHistory,
} from "../controllers/URL.controller";

import validate from "../middlewares/validateResource";

import { Authenticate } from "../middlewares";
import { URLInputSchema } from "../dto/URL.dto";

const router = express.Router();

router.post("/", validate(URLInputSchema), inputURL);
router.get("/:shortcode", getOriginalURL);
router.get("/:shortcode/analytics", getURLAnalytics);
router.get("/history", getUserURLHistory);

export default router;
