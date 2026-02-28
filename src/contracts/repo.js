import { z } from "zod";
import { HttpsUrlSchema, IsoDateTimeSchema, LowercaseDedupedTagsSchema, NonNegativeIntSchema, NullableIsoDateTimeSchema } from "./shared";
export const RepoHealthSchema = z.enum(["green", "yellow", "red", "unknown"]);
export const RepoSchema = z
    .object({
    id: z.string().min(1),
    owner: z.string().min(1),
    name: z.string().min(1),
    fullName: z.string().min(1),
    description: z.string().nullable(),
    defaultBranch: z.string().min(1),
    private: z.boolean(),
    archived: z.boolean(),
    url: HttpsUrlSchema,
    lastCommitSha: z.string().min(1).nullable(),
    lastCommitAt: NullableIsoDateTimeSchema,
    openPrCount: NonNegativeIntSchema,
    workflowCount: NonNegativeIntSchema,
    health: RepoHealthSchema,
    tags: LowercaseDedupedTagsSchema,
    createdAt: IsoDateTimeSchema,
    updatedAt: IsoDateTimeSchema
})
    .superRefine((value, context) => {
    if (value.fullName !== `${value.owner}/${value.name}`) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["fullName"],
            message: "fullName must equal `${owner}/${name}`"
        });
    }
});
//# sourceMappingURL=repo.js.map