import { z } from "zod";

export const OppdragSchema = z.object({
  fagsystemId: z.string(),
  oppdragsId: z.number().int(),
  navnFagGruppe: z.string(),
  navnFagOmraade: z.string(),
  kjorIdag: z.string(),
  typeBilag: z.optional(z.string()),
  kodeStatus: z.string(),
});

export type Oppdrag = z.infer<typeof OppdragSchema>;
