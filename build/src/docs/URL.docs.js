"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getURLAnalytics = exports.redirectUsingShortLink = exports.getUserURLHistory = exports.createURLBody = exports.createURL = void 0;
var createURL = {
    tags: ["Shortner"],
    description: "Create a new short url",
    operationId: "createShortenedURL",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/createURLBody",
                },
            },
        },
        required: true,
    },
    responses: {
        "201": {
            description: "Shortened URL created successfully created successfully, it returns the short url and te base64 string of the qrcode of the URL",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            shortURL: {
                                type: "string",
                                example: "https://oluseyi.com/fhhr-fk",
                            },
                            qrCodeDownloadLink: {
                                type: "string",
                                example: "kkkkbe28y28yvfuyrohvbwvwy-25vvrhf8y8344cw-4r93r3993ukvkre-35niiririri-rjrrururu-rururururururuururuurururjgjjgjgjgjgjjgkkdeeueueueuueueusdgdgyeururhffh",
                            },
                        },
                    },
                },
            },
        },
        "200": {
            description: "send the shorturl and qrcode base64 string if already in the cache",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            cachedShortURL: {
                                type: "object",
                                properties: {
                                    shortURL: {
                                        type: "string",
                                        example: "https://oluseyi.com/fhhr-fk",
                                    },
                                    qrCodeDownloadLink: {
                                        type: "string",
                                        example: "kkkkbe28y28yvfuyrohvbwvwy-25vvrhf8y8344cw-4r93r3993ukvkre-35niiririri-rjrrururu-rururururururuururuurururjgjjgjgjgjgjjgkkdeeueueueuueueusdgdgyeururhffh",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Something went wrong! Please try again",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.createURL = createURL;
var redirectUsingShortLink = {
    tags: ["Shortner"],
    description: "Redirect to original url",
    operationId: "redirectUsingShortLink",
    parameters: [
        {
            name: "shortCode",
            in: "path",
            description: "shortcode of the shortened url",
            required: true,
            schema: {
                type: "string",
            },
        },
    ],
    responses: {
        "200": {
            description: "Redirects to original url",
        },
        "404": {
            description: "Invalid verification code",
            content: {
                "application/json": {
                    schema: {
                        type: "string",
                        example: "url not found",
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Something went wrong! Please try again",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.redirectUsingShortLink = redirectUsingShortLink;
var getURLAnalytics = {
    tags: ["Shortner"],
    description: "Get the short urls Analytics",
    operationId: "getURLAnalytics",
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: "shortCode",
            in: "path",
            description: "shortcode for the shortened url",
            required: true,
            schema: {
                type: "string",
            },
        },
    ],
    responses: {
        "200": {
            description: "Veification successful",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            clicks: {
                                type: "array",
                                properties: {
                                    timestamp: {
                                        type: "date",
                                        example: "2023-06-30T13:31:42.994+00:00",
                                    },
                                    userAgent: {
                                        type: "string",
                                        example: "Mozilla firefox 65:94",
                                    },
                                    countryCode: {
                                        type: "string",
                                        example: "NGA",
                                    },
                                    country: {
                                        type: "string",
                                        example: "Nigeria",
                                    },
                                    region: {
                                        type: "string",
                                        example: "Lagos",
                                    },
                                    city: {
                                        type: "string",
                                        example: "Lagos",
                                    },
                                    latitude: {
                                        type: "string",
                                        example: "54.94.09",
                                    },
                                    longitude: {
                                        type: "string",
                                        example: "54.94.09",
                                    },
                                    zipCode: {
                                        type: "string",
                                        example: "5676575",
                                    },
                                    timeZone: {
                                        type: "string",
                                        example: "Lagos",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "404": {
            description: "Invalid verification code",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "URL not found",
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Something went wrong! Please try again",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.getURLAnalytics = getURLAnalytics;
var getUserURLHistory = {
    tags: ["Shortner"],
    description: "Get the short urls created by the specific authnticated user",
    operationId: "getUserURLHistory",
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        "200": {
            description: "URLs history gotten",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            history: {
                                type: "array",
                                example: "[ttps://hwofh/fwhr, https://vehrh/wi03r]",
                            },
                        },
                    },
                },
            },
        },
        "404": {
            description: "user has no URL history",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "user has no URL history",
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Something went wrong! Please try again",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.getUserURLHistory = getUserURLHistory;
var createURLBody = {
    type: "object",
    properties: {
        originalURL: {
            type: "string",
            example: "https://facebook.com/profile/arfwufwfewefew/ff924fqfcfikvev/djcbh23kndkcwefwenf/cicwefhf2i32?nkcndef'nr+rihr-virir_fnnveroe",
            require: true,
        },
        customDomain: {
            type: "string",
            example: "Oluseyi.com",
            require: false,
        },
    },
};
exports.createURLBody = createURLBody;
