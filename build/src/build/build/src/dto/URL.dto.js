"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLInputSchema = void 0;
var zod_1 = require("zod");
exports.URLInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        originalURL: (0, zod_1.string)({
            required_error: "URL is required",
        }).url({ message: "Input a valid url" }),
        customDomain: (0, zod_1.string)({}).optional(),
        customPath: (0, zod_1.string)({}).optional(),
    }),
});
