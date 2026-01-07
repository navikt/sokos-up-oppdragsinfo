import { z } from "zod";

export const OppdragSchema = z.object({
	fagsystemId: z.string(),
	oppdragsId: z.string(),
	navnFaggruppe: z.string(),
	navnFagomraade: z.string(),
	kjorIdag: z.string(),
	typeBilag: z.optional(z.string()),
	kodeStatus: z.string(),
});

export const OppdragsListSchema = z.array(OppdragSchema);
