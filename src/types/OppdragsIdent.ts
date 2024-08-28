import { z } from "zod";

const _OppdragsIdentSchema = z.object({
  oppdragsId: z.string(),
  linjeId: z.string(),
});

export type OppdragsIdent = z.infer<typeof _OppdragsIdentSchema>;
