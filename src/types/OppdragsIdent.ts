import { z } from "zod";

const OppdragsIdentSchema = z.object({
  oppdragsId: z.string(),
  linjeId: z.string(),
});

export type OppdragsIdent = z.infer<typeof OppdragsIdentSchema>;
