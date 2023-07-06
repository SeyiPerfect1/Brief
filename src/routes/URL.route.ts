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

router.post("/", Authenticate, validate(URLInputSchema), inputURL);
router.get("/history", Authenticate, getUserURLHistory);
router.get("/:shortCode", getOriginalURL);
router.get("/:shortCode/analytics", Authenticate, getURLAnalytics);

export default router;
