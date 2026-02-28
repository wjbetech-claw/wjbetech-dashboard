import { z } from "zod";
import { HttpsUrlSchema, IsoDateTimeSchema, NullableIsoDateTimeSchema } from "./shared";
export const ActiveJobSourceSchema = z.enum(["auto_pr", "auto_commit", "auto_kanban", "manual_user", "manual_agent"]);
export const ActiveJobKindSchema = z.enum(["pull_request", "issue", "kanban_card", "job_application", "custom"]);
export const ActiveJobSchema = z
    .object({
    id: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().nullable(),
    kind: ActiveJobKindSchema,
    source: ActiveJobSourceSchema,
    confidence: z.number().min(0).max(1),
    signal: z.string().min(1),
    repoId: z.string().min(1).nullable(),
    repoFullName: z.string().min(1).nullable(),
    relatedPrId: z.string().min(1).nullable(),
    relatedIssueId: z.string().min(1).nullable(),
    relatedKanbanCardId: z.string().min(1).nullable(),
    url: HttpsUrlSchema.nullable(),
    updatedAt: IsoDateTimeSchema,
    createdAt: IsoDateTimeSchema,
    expiresAt: NullableIsoDateTimeSchema
})
    .superRefine((value, context) => {
    if (value.kind === "pull_request" && value.relatedPrId === null) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["relatedPrId"],
            message: "relatedPrId is required when kind is pull_request"
        });
    }
    if (value.expiresAt !== null && Date.parse(value.expiresAt) < Date.parse(value.updatedAt)) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["expiresAt"],
            message: "expiresAt must be greater than or equal to updatedAt"
        });
    }
});
export const withActiveJobDefaults = (value) => {
    const confidence = value.confidence ?? (value.source === "manual_user" || value.source === "manual_agent" ? 1 : 0);
    return ActiveJobSchema.parse({
        ...value,
        confidence
    });
};
//# sourceMappingURL=activeJob.js.map