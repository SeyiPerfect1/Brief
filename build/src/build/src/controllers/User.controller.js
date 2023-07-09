"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
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
exports.resetPassword = exports.forgotPassword = exports.updateUserProfile = exports.googleAuth = exports.userLogin = exports.resendUserVerificionLink = exports.verifyUser = exports.RegisterUser = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var User_models_1 = require("../models/User.models");
var randomstring_1 = __importDefault(require("randomstring"));
var bcrypt = __importStar(require("bcryptjs"));
var utility_1 = require("../utility");
var axios_1 = __importDefault(require("axios"));
var OtherUtility_1 = require("../utility/OtherUtility");
var Mailer_1 = require("../utility/Mailer");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var environment_1 = __importDefault(require("../config/environment"));
var logger_1 = __importDefault(require("../utility/logger"));
/**
 * @description user registration
 * @method POST
 * @route /api/auth
 * @access public
 */
var RegisterUser = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, firstName, lastName, password, email, existUser, user, _b, _c, name, message, subject, ress, error_1;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 5, , 6]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, email = _a.email;
                    return [4 /*yield*/, User_models_1.UserModel.findOne({ email: email.toLowerCase() })];
                case 1:
                    existUser = _e.sent();
                    if (existUser) {
                        return [2 /*return*/, res.status(400).json({ msg: "User already exists" })];
                    }
                    _c = (_b = User_models_1.UserModel).create;
                    _d = {
                        firstName: firstName,
                        lastName: lastName,
                        password: password,
                        email: email.toLowerCase()
                    };
                    return [4 /*yield*/, (0, OtherUtility_1.GenCode)()];
                case 2: return [4 /*yield*/, _c.apply(_b, [(_d.confirmationCode = _e.sent(),
                            _d)])];
                case 3:
                    user = _e.sent();
                    name = "".concat(user.firstName, " ").concat(user.lastName);
                    message = "<h1>Email Confirmation</h1>\n    <h2>Hello ".concat(name, "</h2>\n    <p>Verify your email address to complete the signup and login to your account</p>\n    <a href=").concat(environment_1.default.BASE_URL, "/api/auth/confirm/").concat(user === null || user === void 0 ? void 0 : user.confirmationCode, "> Click here</a>");
                    subject = "Please confirm your account";
                    return [4 /*yield*/, (0, Mailer_1.sendConfirmationEmail)(name, user === null || user === void 0 ? void 0 : user.email, subject, message)];
                case 4:
                    ress = _e.sent();
                    if (ress !== null) {
                        res.status(201).json({
                            msg: "User created successfully! Please check your mail",
                        });
                    }
                    else {
                        res.status(400);
                        throw new Error("Something went wrong! Please try again");
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _e.sent();
                    res.status(500).send({ msg: "Something went wrong! Please try again" });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.RegisterUser = RegisterUser;
/**
 * @description Verify User account
 * @method GET
 * @route /api/auth/confirm/:confirmationCode
 * @access public
 */
exports.verifyUser = (0, express_async_handler_1.default)(function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var confirmationCode, confirmUser, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    confirmationCode = req.params.confirmationCode;
                    return [4 /*yield*/, User_models_1.UserModel.findOne({ confirmationCode: confirmationCode })];
                case 1:
                    confirmUser = _a.sent();
                    if (confirmUser === null) {
                        res.status(400).send({ msg: "Invalid Verification Code" });
                        return [2 /*return*/];
                    }
                    confirmUser.status = "Active";
                    confirmUser.confirmationCode = "";
                    return [4 /*yield*/, confirmUser.save()];
                case 2:
                    _a.sent();
                    res.status(200).json({
                        msg: "Verification Successful.You can now login",
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.status(500).json({
                        msg: "Something went wrong",
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
/**
 * @description Resend verification link to User's email
 * @method POST
 * @route /api/users/resend-confirm
 * @access public
 */
exports.resendUserVerificionLink = (0, express_async_handler_1.default)(function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var email, user, name, message, subject, ress, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, User_models_1.UserModel.findOne({ email: email.toLowerCase() })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        res.status(400).send({ msg: "User does not exist" });
                        return [2 /*return*/];
                    }
                    name = "".concat(user.firstName, " ").concat(user.lastName);
                    message = "<h1>Email Confirmation</h1>\n    <h2>Hello ".concat(name, "</h2>\n    <p>Verify your email address to complete the signup and login to your account</p>\n    <a href=").concat(environment_1.default.BASE_URL, "/api/auth/confirm/").concat(user === null || user === void 0 ? void 0 : user.confirmationCode, "> Click here</a>");
                    subject = "Please confirm your account";
                    return [4 /*yield*/, (0, Mailer_1.sendConfirmationEmail)(name, user === null || user === void 0 ? void 0 : user.email, subject, message)];
                case 3:
                    ress = _a.sent();
                    if (ress !== null) {
                        res.status(200).json({
                            msg: "Verification link sent, kindly check your mail",
                        });
                    }
                    else {
                        res.status(400);
                        throw new Error("Something went wrong! Please try again");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res
                        .status(500)
                        .send({ msg: "Something went wrong! Please try again", error: error_3 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
/*
 *@description Login into User account
 *@static
 *@param  {Object} req - request
 *@param  {object} res - response
 *@returns {object} token, details
 */
function userLogin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, correctPassword, _b, _c, error_4;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 5, , 6]);
                    if (!email || !password) {
                        res.status(401).send({ message: "Kindly fill all required information" });
                    }
                    return [4 /*yield*/, User_models_1.UserModel.findOne({ email: email }).select("+password").exec()];
                case 2:
                    user = _e.sent();
                    if (!user) {
                        return [2 /*return*/, res
                                .status(401)
                                .json({ message: "Unable to login, Invalid email or  password" })];
                    }
                    // Check if the user's email is set to active.
                    if (user.status !== "Active") {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "your email is yet to be verified" })];
                    }
                    return [4 /*yield*/, bcrypt.compare(password, user.password)];
                case 3:
                    correctPassword = _e.sent();
                    if (!correctPassword) {
                        return [2 /*return*/, res
                                .status(401)
                                .json({ message: "Unable to login, Invalid email or  password" })];
                    }
                    _c = (_b = res.status(200)).json;
                    _d = {
                        message: "User login successfully",
                        id: user === null || user === void 0 ? void 0 : user._id,
                        firstname: user === null || user === void 0 ? void 0 : user.firstName,
                        lastname: user === null || user === void 0 ? void 0 : user.lastName,
                        email: user === null || user === void 0 ? void 0 : user.email
                    };
                    return [4 /*yield*/, (0, utility_1.signToken)({ id: user.id })];
                case 4: return [2 /*return*/, _c.apply(_b, [(_d.token = _e.sent(),
                            _d)])];
                case 5:
                    error_4 = _e.sent();
                    logger_1.default.error(error_4);
                    return [2 /*return*/, res.status(500).json({
                            message: "An Error Occured",
                            error: error_4.error,
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.userLogin = userLogin;
/**
 *@description Register into user account with google
 *@static
 *@param  {Object} req - request
 *@param  {object} res - response
 *@returns {object} - status code, message and data
 *@memberof userController
 */
function googleAuth(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, user, google, TokenData, token_1, userData, code, userObject, TokenData, token_2, userData, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.body.token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=".concat(token))];
                case 2:
                    google = _a.sent();
                    return [4 /*yield*/, User_models_1.UserModel.findOne({ email: google.data.email })];
                case 3:
                    user = _a.sent();
                    if (!user)
                        return [3 /*break*/, 5];
                    TokenData = {
                        id: user._id,
                        email: user.email,
                    };
                    return [4 /*yield*/, (0, utility_1.signToken)(TokenData)];
                case 4:
                    token_1 = _a.sent();
                    userData = {
                        user: user,
                        token: token_1,
                    };
                    res.status(200).send({ message: "Login successfully", userData: userData });
                    return [3 /*break*/, 8];
                case 5:
                    code = randomstring_1.default.generate({
                        length: 15,
                        charset: "numeric",
                    });
                    userObject = {
                        email: google.data.email != null ? google.data.email : "",
                        full_name: google.data.name != null ? google.data.name : "",
                        phone: google.data.phone != null ? google.data.phone : "",
                        avartar: google.data.picture != null ? google.data.picture : "",
                        status: "Active",
                        password: code,
                    };
                    return [4 /*yield*/, User_models_1.UserModel.create(userObject)];
                case 6:
                    user = _a.sent();
                    TokenData = {
                        id: user._id,
                        email: user.email,
                    };
                    return [4 /*yield*/, (0, utility_1.signToken)(TokenData)];
                case 7:
                    token_2 = _a.sent();
                    userData = {
                        user: user,
                        token: token_2,
                    };
                    if (user) {
                        res
                            .status(201)
                            .send({ message: "Account created, kindly proceed", userData: userData });
                    }
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_5 = _a.sent();
                    logger_1.default.error(error_5);
                    res.status(500).send({ message: "Error", error: error_5 });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.googleAuth = googleAuth;
/**
 * @description Update Buyer Profile
 * @method GET
 * @route /api/auth/confirm/:confirmationCode
 * @access private
 */
exports.updateUserProfile = (0, express_async_handler_1.default)(function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var user, _a, firstName, lastName, image, updatedBuyer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, User_models_1.UserModel.findById(req.user.id)];
                case 1:
                    user = _b.sent();
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, image = _a.image;
                    if (!user)
                        return [3 /*break*/, 3];
                    user.firstName = firstName || user.firstName;
                    user.lastName = lastName || user.lastName;
                    user.image = image || user.image;
                    return [4 /*yield*/, user.save()];
                case 2:
                    updatedBuyer = _b.sent();
                    res.status(200).send({
                        msg: "Profile updated successfully",
                        updatedBuyer: updatedBuyer,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).send("User not found");
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
/**
 * @description User Forgot Password
 * @method POST
 * @route /api/auth/forgotpassword
 * @access public
 */
var forgotPassword = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var email, checkEmail, secret, payload, name, token, link, message, subject, ress, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    email = req.body.email;
                    return [4 /*yield*/, User_models_1.UserModel.findOne({ email: email })];
                case 1:
                    checkEmail = _a.sent();
                    if (!checkEmail) {
                        return [2 /*return*/, res.status(400).json({
                                message: "No User With This Email",
                            })];
                    }
                    secret = process.env.JWT_SECRET + checkEmail.password;
                    payload = {
                        email: checkEmail.email,
                        id: checkEmail.id,
                    };
                    name = "".concat(checkEmail.firstName, " ").concat(checkEmail.lastName);
                    token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "5m" });
                    link = "".concat(process.env.BASE_URL, "/api/auth/reset-password/").concat(checkEmail.id, "/").concat(token);
                    message = "<h1>Reset Password</h1>\n    <h2>Hello ".concat(name, "</h2>\n    <p>Please Reset Your Password</p>\n    <a href=").concat(process.env.BASE_URL, "/api/>auth/reset-password/").concat(checkEmail.id, "/").concat(token, "> Click here</a>");
                    subject = "Please Reset Your Password";
                    return [4 /*yield*/, (0, Mailer_1.sendConfirmationEmail)(name, checkEmail.email, subject, message)];
                case 2:
                    ress = _a.sent();
                    if (ress !== null) {
                        return [2 /*return*/, res.status(200).json({
                                message: "Reset Password Link Sent successfully! Please check your mail",
                                reset_link: link,
                            })];
                    }
                    else {
                        return [2 /*return*/, res.status(400).json({
                                message: "Something went wrong! Please try again",
                            })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    logger_1.default.error(error_6);
                    res.status(500).json({
                        message: "Error Sending Reset Password Email",
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.forgotPassword = forgotPassword;
/**
 * @description User Reset Password
 * @method POST
 * @route /api/auth/restpassword
 * @access public
 */
var resetPassword = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, id, token, _b, password, confirmPassword, user, secret, payload, newpassword, error_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    _a = req.params, id = _a.id, token = _a.token;
                    _b = req.body, password = _b.password, confirmPassword = _b.confirmPassword;
                    return [4 /*yield*/, User_models_1.UserModel.findById(id).exec()];
                case 1:
                    user = _c.sent();
                    if (user === null) {
                        return [2 /*return*/, res.status(400).json({
                                message: "No User With This Id",
                            })];
                    }
                    secret = process.env.JWT_SECRET + user.password;
                    payload = jsonwebtoken_1.default.verify(token, secret);
                    if (confirmPassword !== password) {
                        return [2 /*return*/, res.status(400).json({
                                message: "Passwords Do Not Match",
                            })];
                    }
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    newpassword = _c.sent();
                    console.log(newpassword);
                    user.password = newpassword;
                    return [4 /*yield*/, user.save()];
                case 3:
                    _c.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: "Password Reset Successfully!",
                        })];
                case 4:
                    error_7 = _c.sent();
                    logger_1.default.error(error_7);
                    res.status(400).json({
                        message: "Error Reseting Password",
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.resetPassword = resetPassword;
