import { z } from "zod";
import { HttpsUrlSchema, IsoDateTimeSchema, LowercaseDedupedTagsSchema, NullableIsoDateTimeSchema } from "./shared";
export const JobSourceSchema = z.enum(["linkedin", "indeed", "greenhouse", "lever", "manual", "other"]);
export const JobPipelineStatusSchema = z.enum([
    "discovered",
    "saved",
    "applied",
    "screening",
    "interview",
    "offer",
    "rejected",
    "archived"
]);
export const EmploymentTypeSchema = z.enum(["full_time", "part_time", "contract", "internship", "unknown"]);
export const JobListingSchema = z
    .object({
    id: z.string().min(1),
    externalId: z.string().min(1).nullable(),
    source: JobSourceSchema,
    title: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1).nullable(),
    remote: z.boolean(),
    employmentType: EmploymentTypeSchema,
    salaryMin: z.number().nullable(),
    salaryMax: z.number().nullable(),
    salaryCurrency: z.string().min(1).nullable(),
    url: HttpsUrlSchema,
    postedAt: NullableIsoDateTimeSchema,
    discoveredAt: IsoDateTimeSchema,
    status: JobPipelineStatusSchema,
    notes: z.string().nullable(),
    tags: LowercaseDedupedTagsSchema,
    createdAt: IsoDateTimeSchema,
    updatedAt: IsoDateTimeSchema
})
    .superRefine((value, context) => {
    if (value.salaryMin !== null && value.salaryMax !== null && value.salaryMin > value.salaryMax) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["salaryMin"],
            message: "salaryMin must be less than or equal to salaryMax"
        });
    }
});
//# sourceMappingURL=job.js.map