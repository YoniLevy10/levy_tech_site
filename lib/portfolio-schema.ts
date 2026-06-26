import { z } from "zod"

export const PortfolioSchema = z.object({
  title: z.string().min(1),
  description: z.string().max(300).optional().default(""),
  status: z
    .enum(["Production", "Pilot", "Development", "Paused", "Archived"])
    .default("Development"),
  visibility: z.boolean().default(false),
  featured: z.boolean().default(false),
  category: z.string().optional().default(""),
  website: z.string().optional().default(""),
  logo: z.string().optional().default(""),
  cover: z.string().optional().default(""),
  video: z.string().optional().default(""),
  technologies: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
})

export type PortfolioMeta = z.infer<typeof PortfolioSchema>
