import { z } from "zod";

export const FaggruppeSchema = z.object({
  navn: z.string(),
  type: z.string(),
});

export type Faggruppe = z.infer<typeof FaggruppeSchema>;

export const OppdragSchema = z.object({
  fagsystemId: z.string(),
  oppdragsId: z.number().int(),
  navnFagGruppe: z.string(),
  navnFagOmraade: z.string(),
  kjorIdag: z.string(),
  typeBilag: z.optional(z.string()),
  kodeStatus: z.string(),
});

export type Oppdrag = z.infer<typeof OppdragSchema>;

export const OppdragSearchResultsSchema = z.array(
  z.object({
    gjelderId: z.string(),
    gjelderNavn: z.string(),
    oppdragsListe: z.array(OppdragSchema),
  }),
);

export type OppdragSearchResults = z.infer<typeof OppdragSearchResultsSchema>;

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

export const EnhetSchema = z.object({
  type: z.string(),
  datoFom: z.string(),
  enhet: z.string(),
});

export type Enhet = z.infer<typeof EnhetSchema>;
export type BehandlendeEnhet = z.infer<typeof EnhetSchema>;

export const OppdragsdetaljerSchema = z.object({
  enhet: EnhetSchema,
  behandlendeEnhet: EnhetSchema,
  harOmposteringer: z.boolean(),
  oppdragsLinjer: z.array(OppdragslinjeSchema),
});

export type Oppdragsdetaljer = z.infer<typeof OppdragsdetaljerSchema>;
