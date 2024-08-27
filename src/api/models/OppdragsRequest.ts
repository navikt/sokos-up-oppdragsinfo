import { z } from "zod";

const OppdragsRequestSchema = z.object({
  gjelderId: z.string(),
  faggruppeKode: z.string().optional(),
});

export type OppdragsRequest = z.infer<typeof OppdragsRequestSchema>;
