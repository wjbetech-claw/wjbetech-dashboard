import { z } from "zod";
import {
  HttpsUrlSchema,
  IsoDateTimeSchema,
  NonNegativeIntSchema,
  NullableIsoDateTimeSchema,
  PositiveIntSchema
} from "./shared";

export const WorkflowStatusSchema = z.enum(["queued", "in_progress", "completed"]);

export const WorkflowConclusionSchema = z
  .enum(["success", "failure", "cancelled", "skipped", "timed_out", "neutral"])
  .nullable();

export const WorkflowRunSchema = z
  .object({
    id: z.string().min(1),
    repoId: z.string().min(1),
    repoFullName: z.string().min(1),
    name: z.string().min(1),
    branch: z.string().min(1),
    status: WorkflowStatusSchema,
    conclusion: WorkflowConclusionSchema,
    actor: z.string().min(1),
    commitSha: z.string().min(1),
    commitMessage: z.string().nullable(),
    runNumber: PositiveIntSchema,
    htmlUrl: HttpsUrlSchema,
    startedAt: NullableIsoDateTimeSchema,
    completedAt: NullableIsoDateTimeSchema,
    durationMs: NonNegativeIntSchema.nullable(),
    createdAt: IsoDateTimeSchema,
    updatedAt: IsoDateTimeSchema
  })
  .superRefine((value, context) => {
    if (value.status !== "completed" && value.conclusion !== null) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["conclusion"],
        message: "conclusion must be null unless status is completed"
      });
    }

    if (value.startedAt && value.completedAt && value.durationMs !== null) {
      const startedAt = Date.parse(value.startedAt);
      const completedAt = Date.parse(value.completedAt);
      if (completedAt < startedAt) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["completedAt"],
          message: "completedAt must be greater than or equal to startedAt"
        });
      }
    }
  });

export type WorkflowStatus = z.infer<typeof WorkflowStatusSchema>;
export type WorkflowConclusion = z.infer<typeof WorkflowConclusionSchema>;
export type WorkflowRun = z.infer<typeof WorkflowRunSchema>;
