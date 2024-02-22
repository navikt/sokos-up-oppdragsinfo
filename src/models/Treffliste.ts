import { z } from "zod";
import { OppdragSchema } from "./OppdragsinfoData";

export const TrefflisteSchema = z.array(
  z.object({
    gjelderId: z.string(),
    gjelderNavn: z.string(),
    oppdragsListe: z.array(OppdragSchema),
  }),
);

export type Treffliste = z.infer<typeof TrefflisteSchema>;
