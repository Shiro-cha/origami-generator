import { z } from 'zod';

export const ConfigSchema = z.object({
  root: z.string().optional(),
  variables: z.record(z.string()).optional(),
  structure: z.record(z.any())
});

export type Config = z.infer<typeof ConfigSchema>;