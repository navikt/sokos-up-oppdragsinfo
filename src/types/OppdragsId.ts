import { z } from "zod";

const OppdragsIdSchema = z.object({
  oppdragsId: z.string(),
});

export type OppdragsId = z.infer<typeof OppdragsIdSchema>;
