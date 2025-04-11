import { z } from "zod";

export const OppdragsLinjeSchema = z.object({
  attestert: z.string().optional(),
  brukerId: z.string(),
  datoFom: z.string(),
  datoVedtakFom: z.string(),
  datoVedtakTom: z.string().optional(),
  delytelseId: z.string(),
  hovedkontonr: z.string().optional(),
  kodeKlasse: z.string(),
  kodeStatus: z.string(),
  linjeId: z.string(),
  linjeIdKorr: z.number().int().optional(),
  refunderesId: z.string().optional(),
  sats: z.number(),
  tidspktReg: z.string(),
  typeSats: z.string(),
  underkontonr: z.string().optional(),
  utbetalesTilId: z.string(),
  vedtakssats: z.number().optional(),
});

export const OppdragsLinjeListSchema = z.array(OppdragsLinjeSchema);
