import { z } from "zod";

// Modellert etter ForespørselRequest i sokos-skattekort
export const ForespoerselRequestSchema = z.object({
	personIdent: z.string(),
	aar: z.int(),
	forsystem: z.string(),
});

export type ForespoerselRequest = z.infer<typeof ForespoerselRequestSchema>;
