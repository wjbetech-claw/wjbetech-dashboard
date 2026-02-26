import { z } from 'zod'

export const RepoSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string().optional(),
  openPRs: z.number().optional(),
  workflows: z.number().optional(),
})

export const OverviewSchema = z.object({
  systemHealth: z.object({ status: z.string(), message: z.string() }),
  deployments: z.object({ completed24h: z.number(), inProgress: z.number() }),
  activeFocus: z.object({ title: z.string(), eta: z.string() }),
})

export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  status: z.string(),
})
