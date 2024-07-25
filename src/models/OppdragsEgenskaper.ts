import { z } from "zod";

export const OppdragsEgenskapSchema = z.object({
  fagsystemId: z.string(),
  oppdragsId: z.number().int(),
  navnFagGruppe: z.string(),
  navnFagOmraade: z.string(),
  kjorIdag: z.string(),
  typeBilag: z.optional(z.string()),
  kodeStatus: z.string(),
});

export const OppdragsEgenskaperSchema = z.array(OppdragsEgenskapSchema);

export type OppdragsEgenskaper = z.infer<typeof OppdragsEgenskaperSchema>;

export type OppdragsEgenskap = z.infer<typeof OppdragsEgenskapSchema>;
