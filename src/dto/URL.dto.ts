import { object, string, TypeOf } from "zod";

export const URLInputSchema = object({
  body: object({
    originalURL: string({
      required_error: "URL is required",
    }).url({ message: "Input a valid url" }),
    customDomain: string({}),
    customPath: string({}),
  }),
});

export type IURLInput = TypeOf<typeof URLInputSchema>;
