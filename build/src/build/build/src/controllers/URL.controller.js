"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1)
                throw t[1];
            return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserURLHistory = exports.getURLAnalytics = exports.getOriginalURL = exports.inputURL = void 0;
var URL_models_1 = require("../models/URL.models");
var shortid_1 = __importDefault(require("shortid"));
var environment_1 = __importDefault(require("../config/environment"));
var User_models_1 = require("../models/User.models");
var axios_1 = __importDefault(require("axios"));
var redisConfig_1 = require("../config/redisConfig");
var clickDetails_1 = require("../utility/clickDetails");
/**
 * @description shorten URL
 * @method POST
 * @route /api/shortner
 * @access public
 */
var inputURL = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, originalURL, customDomain, cachedShortURL, shortCode, shortURL, apiUrl, qrCodePayload, response, qrCodeImage, URLCreatedetails, user, value, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, originalURL = _a.originalURL, customDomain = _a.customDomain;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, (0, redisConfig_1.getValuesFromRedis)(originalURL)];
                case 2:
                    cachedShortURL = _b.sent();
                    if (!(Object.keys(cachedShortURL).length !== 0))
                        return [3 /*break*/, 3];
                    // Return the cached short URL
                    return [2 /*return*/, res.status(200).send(cachedShortURL)];
                case 3:
                    shortCode = shortid_1.default.generate();
                    shortURL = void 0;
                    if (customDomain) {
                        shortURL = "https://".concat(customDomain, "/").concat(shortCode);
                    }
                    else {
                        shortURL = "".concat(environment_1.default.BASE_URL, "/").concat(shortCode);
                    }
                    apiUrl = "https://api.qrcode-monkey.com/qr/custom";
                    qrCodePayload = {
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
                    return [4 /*yield*/, axios_1.default.post(apiUrl, qrCodePayload, {
                            responseType: "arraybuffer",
                        })];
                case 4:
                    response = _b.sent();
                    qrCodeImage = Buffer.from(response.data, "binary").toString("base64");
                    URLCreatedetails = { originalURL: originalURL, shortCode: shortCode };
                    if (customDomain) {
                        URLCreatedetails.customDomain = customDomain;
                    }
                    if (qrCodeImage) {
                        URLCreatedetails.qrCodeImage = qrCodeImage;
                    }
                    // // Save the URL mapping to the database
                    return [4 /*yield*/, URL_models_1.URLModel.create(URLCreatedetails)];
                case 5:
                    // // Save the URL mapping to the database
                    _b.sent();
                    return [4 /*yield*/, User_models_1.UserModel.findOne({ _id: req.user.id })];
                case 6:
                    user = _b.sent();
                    user.URLs.push(shortURL);
                    return [4 /*yield*/, user.save()];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, (0, redisConfig_1.setValuesInRedis)(originalURL, {
                            shortCode: shortCode,
                            qrCodeImage: qrCodeImage,
                        })];
                case 8:
                    value = _b.sent();
                    console.log("Value set successfully", value);
                    // Return the short URL and QR code download link
                    res.status(201).send({ shortURL: shortURL, qrCodeDownloadLink: qrCodeImage });
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _b.sent();
                    res.status(500).send({ msg: "Something went wrong! Please try again" });
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
};
exports.inputURL = inputURL;
/**
 * @description redirect to Original URL
 * @method GET
 * @route /api/shortner/:shortCode
 * @access public
 */
var getOriginalURL = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var shortCode, cachedOriginalURL, userAgent, ipAddress, URL_1, value, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shortCode = req.params.shortCode;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, (0, redisConfig_1.getValuesFromRedis)(shortCode)];
                case 2:
                    cachedOriginalURL = _a.sent();
                    userAgent = req.headers["user-agent"];
                    ipAddress = req.ip;
                    if (!(Object.keys(cachedOriginalURL).length !== 0))
                        return [3 /*break*/, 4];
                    // Redirect to the original URL from the cache
                    res.redirect(cachedOriginalURL.originalURL);
                    return [4 /*yield*/, (0, clickDetails_1.clickDetails)(ipAddress, userAgent, shortCode)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, (0, clickDetails_1.clickDetails)(ipAddress, userAgent, shortCode)];
                case 5:
                    // Find the URL mapping in the database
                    URL_1 = _a.sent();
                    return [4 /*yield*/, (0, redisConfig_1.setValuesInRedis)(shortCode, {
                            originalURL: URL_1.originalURL,
                            qrCodeImage: URL_1.qrCodeImage,
                        })];
                case 6:
                    value = _a.sent();
                    console.log("Value set successfully", value);
                    // Redirect to the original URL
                    res.redirect(URL_1.originalURL);
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_2 = _a.sent();
                    res.status(500).send({ msg: "Something went wrong! Please try again" });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.getOriginalURL = getOriginalURL;
/**
 * @description get URL analytics
 * @method GET
 * @route /api/shortner/:shortcode/analytics
 * @access public
 */
var getURLAnalytics = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var shortCode, URL_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shortCode = req.params.shortCode;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, URL_models_1.URLModel.findOne({ shortCode: shortCode })];
                case 2:
                    URL_2 = _a.sent();
                    if (!URL_2) {
                        return [2 /*return*/, res.status(404).json({ msg: "URL not found" })];
                    }
                    // Return the analytics data
                    res.status(200).send({ clicks: URL_2.clicks });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(500).send({ msg: "Something went wrong! Please try again" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getURLAnalytics = getURLAnalytics;
/**
 * @description get URL analytics
 * @method GET
 * @route /api/shortner/history
 * @access public
 */
var getUserURLHistory = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var user, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, User_models_1.UserModel.findOne({ _id: req.user.id })
                            .populate("URLs")
                            .exec()];
                case 1:
                    user = _a.sent();
                    if ((user === null || user === void 0 ? void 0 : user.URLs.length) === 0) {
                        return [2 /*return*/, res.status(404).json({ msg: "user has no URL history" })];
                    }
                    // Return the analytics data
                    res.status(200).send({ history: user === null || user === void 0 ? void 0 : user.URLs });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(500).send({ msg: "Something went wrong! Please try again" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getUserURLHistory = getUserURLHistory;
