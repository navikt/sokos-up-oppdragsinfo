import { z } from "zod";

const _OppdragSchema = z.object({
  fagsystemId: z.string(),
  oppdragsId: z.string(),
  navnFagGruppe: z.string(),
  navnFagOmraade: z.string(),
  kjorIdag: z.string(),
  typeBilag: z.optional(z.string()),
  kodeStatus: z.string(),
});

const _OppdragsListeSchema = z.array(_OppdragSchema);

export type OppdragsListe = z.infer<typeof _OppdragsListeSchema>;

export type Oppdrag = z.infer<typeof _OppdragSchema>;
