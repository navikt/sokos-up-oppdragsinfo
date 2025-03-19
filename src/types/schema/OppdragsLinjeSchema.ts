import { z } from "zod";

export const OppdragsLinjeSchema = z.object({
  attestert: z.string(),
  brukerId: z.string(),
  datoFom: z.string(),
  datoVedtakFom: z.string(),
  datoVedtakTom: z.string(),
  delytelseId: z.string(),
  hovedkontonr: z.string().optional(),
  kodeKlasse: z.string(),
  kodeStatus: z.string(),
  linjeId: z.string(),
  linjeIdKorr: z.number().int(),
  refunderesOrgnr: z.string(),
  sats: z.number(),
  tidspktReg: z.string(),
  typeSats: z.string(),
  underkontonr: z.string().optional(),
  utbetalesTilId: z.string(),
  vedtakssats: z.number().optional(),
});

export const OppdragsLinjeListSchema = z.array(OppdragsLinjeSchema);
