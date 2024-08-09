import { z } from "zod";

const OppdragSchema = z.object({
  fagsystemId: z.string(),
  oppdragsId: z.string(),
  navnFagGruppe: z.string(),
  navnFagOmraade: z.string(),
  kjorIdag: z.string(),
  typeBilag: z.optional(z.string()),
  kodeStatus: z.string(),
});

const OppdragsListeSchema = z.array(OppdragSchema);

export type OppdragsListe = z.infer<typeof OppdragsListeSchema>;

export type Oppdrag = z.infer<typeof OppdragSchema>;
