import { z } from "zod";
import {
  HttpsUrlSchema,
  IsoDateTimeSchema,
  LowercaseDedupedTagsSchema,
  NonNegativeIntSchema,
  NullableIsoDateTimeSchema,
  PositiveIntSchema
} from "./shared";

export const PrStateSchema = z.enum(["open", "closed", "merged"]);

export const PrReviewStateSchema = z.enum(["approved", "changes_requested", "commented", "pending", "none"]);

export const PullRequestSchema = z
  .object({
    id: z.string().min(1),
    repoId: z.string().min(1),
    repoFullName: z.string().min(1),
    number: PositiveIntSchema,
    title: z.string().min(1),
    author: z.string().min(1),
    branch: z.string().min(1),
    baseBranch: z.string().min(1),
    state: PrStateSchema,
    reviewState: PrReviewStateSchema,
    labels: LowercaseDedupedTagsSchema,
    draft: z.boolean(),
    additions: NonNegativeIntSchema,
    deletions: NonNegativeIntSchema,
    changedFiles: NonNegativeIntSchema,
    commentsCount: NonNegativeIntSchema,
    commitsCount: NonNegativeIntSchema,
    htmlUrl: HttpsUrlSchema,
    createdAt: IsoDateTimeSchema,
    updatedAt: IsoDateTimeSchema,
    closedAt: NullableIsoDateTimeSchema,
    mergedAt: NullableIsoDateTimeSchema
  })
  .superRefine((value, context) => {
    if (value.state === "open" && (value.closedAt !== null || value.mergedAt !== null)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["state"],
        message: "open pull requests must not have closedAt or mergedAt"
      });
    }

    if (value.state === "merged" && value.mergedAt === null) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mergedAt"],
        message: "merged pull requests must have mergedAt"
      });
    }
  });

export type PrState = z.infer<typeof PrStateSchema>;
export type PrReviewState = z.infer<typeof PrReviewStateSchema>;
export type PullRequest = z.infer<typeof PullRequestSchema>;
