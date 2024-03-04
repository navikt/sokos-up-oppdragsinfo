import { z } from "zod";
import { OppdragSchema } from "./Oppdrag";

export const TreffSchema = z.object({
  gjelderId: z.string(),
  gjelderNavn: z.string(),
  oppdragsListe: z.array(OppdragSchema),
});

export type Treff = z.infer<typeof TreffSchema>;

export const TrefflisteSchema = z.array(TreffSchema);

export type Treffliste = z.infer<typeof TrefflisteSchema>;
