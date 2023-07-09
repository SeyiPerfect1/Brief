"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
var environment_1 = __importDefault(require("../config/environment"));
var URL_docs_1 = require("./URL.docs");
var User_docs_1 = require("./User.docs");
//options object for swaggerjs
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Nene",
            version: "1.0.0",
            description: "An api for NeNe",
        },
        paths: {
            // for authentication/users
            "/auth/register": {
                post: User_docs_1.createUser,
            },
            "/auth/confirm/{confirmationCode}": {
                get: User_docs_1.verifyUserMail,
            },
            "/auth/resend-confirm": {
                post: User_docs_1.resendVerifyUserMail,
            },
            "/auth/login": {
                post: User_docs_1.loginUser,
            },
            "/auth/update": {
                put: User_docs_1.updateUser,
            },
            "/auth/forgot-password": {
                post: User_docs_1.forgotPasswordUser,
            },
            "/auth/reset-password/{id}/{token}": {
                post: User_docs_1.resetpasswordUser,
            },
            // for UrLs
            "/shortner": {
                post: URL_docs_1.createURL,
            },
            "/shortner/history": {
                get: URL_docs_1.getUserURLHistory,
            },
            "/shortner/{shortCode}": {
                get: URL_docs_1.redirectUsingShortLink,
            },
            "/shortner/{shortCode}/analytics": {
                get: URL_docs_1.getURLAnalytics,
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                createUserBody: User_docs_1.createUserBody,
                createURLBody: URL_docs_1.createURLBody
            },
        },
        servers: [
            {
                //update to production url
                url: "".concat(environment_1.default.BASE_URL, "/api/"),
            },
        ],
        tags: [
            {
                name: "Auth",
            },
            {
                name: "Shortner",
            },
        ],
    },
    apis: ["../routes/index.ts"],
};
