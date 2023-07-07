import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface URLDoc extends Document {
  shortCode: string;
  originalURL: string;
  clicks: {}[];
  customDomain: string;
  qrCodeImage: string;
}

const URLSchema: Schema = new mongoose.Schema<URLDoc>(
  {
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
  },
  {
    timestamps: true,
  }
);

export const URLModel = mongoose.model<URLDoc>("URL", URLSchema);

