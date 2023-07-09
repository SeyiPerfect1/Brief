"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var URLSchema = new mongoose_1.default.Schema({
    shortCode: {
        type: String,
        required: [true, "shortCode required"],
        unique: true,
    },
    originalURL: {
        type: String,
        required: [true, "URL required"],
    },
    customDomain: String,
    qrCodeImage: String,
    clicks: [
        {
            timestamp: { type: Date, default: Date.now },
            userAgent: String,
            countryCode: String,
            country: String,
            region: String,
            city: String,
            latitude: String,
            longitude: String,
            zipCode: String,
            timeZone: String,
        },
    ],
}, {
    timestamps: true,
});
exports.URLModel = mongoose_1.default.model("URL", URLSchema);
