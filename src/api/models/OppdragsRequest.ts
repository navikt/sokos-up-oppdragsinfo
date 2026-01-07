import { z } from "zod";

export const OppdragsRequestSchema = z.object({
	gjelderId: z.string(),
	fagGruppeKode: z.string().optional(),
});

export type OppdragsRequest = z.infer<typeof OppdragsRequestSchema>;
