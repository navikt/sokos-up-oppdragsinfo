import { z } from "zod";

const _OppdragsIdSchema = z.object({
  oppdragsId: z.string(),
});

export type OppdragsId = z.infer<typeof _OppdragsIdSchema>;
