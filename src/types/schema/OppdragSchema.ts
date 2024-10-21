import { z } from "zod";

export const OppdragSchema = z.object({
  fagSystemId: z.string(),
  oppdragsId: z.string(),
  navnFagGruppe: z.string(),
  navnFagOmraade: z.string(),
  kjorIdag: z.string(),
  typeBilag: z.optional(z.string()),
  kodeStatus: z.string(),
});

export const OppdragsListeSchema = z.array(OppdragSchema);
