import { z } from "zod";

export const IsoDateTimeSchema = z.string().datetime({ offset: true });

export const NullableIsoDateTimeSchema = IsoDateTimeSchema.nullable();

export const HttpsUrlSchema = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"), {
    message: "Expected an absolute HTTPS URL"
  });

export const NonNegativeIntSchema = z.number().int().nonnegative();

export const PositiveIntSchema = z.number().int().positive();

export const LowercaseDedupedTagsSchema = z
  .array(z.string().min(1))
  .refine((tags) => tags.every((tag) => tag === tag.toLowerCase()), {
    message: "Tags must be lowercase"
  })
  .refine((tags) => new Set(tags).size === tags.length, {
    message: "Tags must be de-duplicated"
  });
