import { z } from "zod";
import { _OppdragsLinjeSchema } from "./Oppdragslinje";

export const OppdragsLinjeDetaljerSchema = z.object({
  korrigerteLinjeIder: z.array(_OppdragsLinjeSchema).min(1),
  harValutaer: z.boolean(),
  harSkyldnere: z.boolean(),
  harKravhavere: z.boolean(),
  harEnheter: z.boolean(),
  harGrader: z.boolean(),
  harTekster: z.boolean(),
  harKidliste: z.boolean(),
  harMaksdatoer: z.boolean(),
});

export type OppdragsLinjeDetaljer = z.infer<typeof OppdragsLinjeDetaljerSchema>;
