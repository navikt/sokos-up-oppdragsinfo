import { z } from "zod";

export const _OppdragsRequestSchema = z.object({
  gjelderId: z.string(),
  faggruppeKode: z.string().optional(),
});

export type OppdragsRequest = z.infer<typeof _OppdragsRequestSchema>;
