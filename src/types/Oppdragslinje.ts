import { z } from "zod";

export const _OppdragsLinjeSchema = z.object({
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

const _OppdragsLinjerSchema = z.array(_OppdragsLinjeSchema);

export type OppdragsLinje = z.infer<typeof _OppdragsLinjeSchema>;

export type OppdragsLinjer = z.infer<typeof _OppdragsLinjerSchema>;
