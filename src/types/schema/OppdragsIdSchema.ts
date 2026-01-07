import { z } from "zod";

export const OppdragsIdSchema = z.object({
	oppdragsId: z.string(),
});
