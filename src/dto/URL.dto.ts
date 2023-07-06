import { object, string, TypeOf } from "zod";

export const URLInputSchema = object({
  body: object({
    originalURL: string({
      required_error: "URL is required",
    }).url({ message: "Input a valid url" }),
    customDomain: string({}).optional(),
    customPath: string({}).optional(),
  }),
});

export interface URLCreateDetails {
  originalURL: string; // Required if no Custom Domain or Path are provided.
  shortCode: string;
  customDomain?: string;
  customPath?: string;
  qrCodeImage?: string;
}

export interface cachedShortURL {
  originalURL: string;
  qrCodeImage: string;
}

export type IURLInput = TypeOf<typeof URLInputSchema>;
