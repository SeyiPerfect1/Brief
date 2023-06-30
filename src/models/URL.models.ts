import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface URLDoc extends Document {
  shortURL: string;
  originalURL: string;
  clicks: {}[];
  customDomain: string,
  customPath: string,
}

const URLSchema: Schema = new mongoose.Schema<URLDoc>(
  {
    shortURL: {
      type: String,
      required: [true, "shortURL required"],
    },
    originalURL: {
      type: String,
      required: [true, "URL required"],
    },
    customDomain: String,
    customPath: String,
    clicks: [
      {
        timestamp: { type: Date, default: Date.now },
        referrer: String,
        userAgent: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// // Encrypt password with bcrypt
// UserSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     // this.confirmationCode = await bcrypt.hash(
//     //   this.password,
//     //   process.env.HASH_SALT || 10
//     // );
//   } catch (error: any) {
//     throw new Error(error);
//   }
// });

const URLModel = mongoose.model<URLDoc>("URL", URLSchema);

export default URLModel;
