import { z } from "zod";

export const OppdragslinjeSchema = z.object({
  linjeId: z.string(),
  kodeKlasse: z.string(),
  datoVedtakFom: z.string(),
  sats: z.number(),
  typeSats: z.string(),
  kodeStatus: z.string(),
  datoFom: z.string(),
  linjeIdKorr: z.number().int(),
  attestert: z.string(),
  delytelseId: z.string(),
  utbetalesTilId: z.string(),
});

export type Oppdragslinje = z.infer<typeof OppdragslinjeSchema>;
