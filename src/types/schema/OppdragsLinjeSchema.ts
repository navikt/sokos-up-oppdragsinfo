import { z } from "zod";

export const OppdragsLinjeSchema = z.object({
  linjeId: z.string(),
  kodeKlasse: z.string(),
  datoVedtakFom: z.string(),
  datoVedtakTom: z.string(),
  sats: z.number(),
  typeSats: z.string(),
  kodeStatus: z.string(),
  datoFom: z.string(),
  linjeIdKorr: z.number().int(),
  attestert: z.string(),
  delytelseId: z.string(),
  utbetalesTilId: z.string(),
  refunderesOrgnr: z.string(),
  brukerId: z.string(),
  tidspktReg: z.string(),
});

export const OppdragsLinjeListSchema = z.array(OppdragsLinjeSchema);
