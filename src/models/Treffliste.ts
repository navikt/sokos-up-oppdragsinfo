import { isArray } from "@grafana/faro-web-sdk";
import { z } from "zod";
import { firstOf, isEmpty } from "../util/commonUtils";
import { OppdragSchema } from "./Oppdrag";

export const TreffSchema = z.object({
  gjelderId: z.string(),
  gjelderNavn: z.string(),
  oppdragsListe: z.array(OppdragSchema),
});

export type Treff = z.infer<typeof TreffSchema>;

export const TrefflisteSchema = z.array(TreffSchema);

export type Treffliste = z.infer<typeof TrefflisteSchema>;

export const getOppdragFromTreffliste = (
  treffliste: Treffliste | undefined,
  oppdragsID: number,
) =>
  isArray(treffliste) &&
  !isEmpty(treffliste) &&
  !isEmpty(firstOf(treffliste).oppdragsListe) &&
  firstOf(treffliste).oppdragsListe.some((a) => a.oppdragsId === oppdragsID)
    ? treffliste
        .reduce((a) => a)
        .oppdragsListe.filter((o) => o.oppdragsId === oppdragsID)
        .reduce((a) => a)
    : null;
