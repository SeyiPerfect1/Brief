"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var URL_controller_1 = require("../controllers/URL.controller");
var validateResource_1 = __importDefault(require("../middlewares/validateResource"));
var middlewares_1 = require("../middlewares");
var URL_dto_1 = require("../dto/URL.dto");
var router = express_1.default.Router();
router.post("/", middlewares_1.Authenticate, (0, validateResource_1.default)(URL_dto_1.URLInputSchema), URL_controller_1.inputURL);
router.get("/history", middlewares_1.Authenticate, URL_controller_1.getUserURLHistory);
router.get("/:shortCode", URL_controller_1.getOriginalURL);
router.get("/:shortCode/analytics", middlewares_1.Authenticate, URL_controller_1.getURLAnalytics);
exports.default = router;
