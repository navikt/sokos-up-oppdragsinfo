import { z } from "zod";
import { OppdragsLinjeSchema } from "./OppdragsLinjeSchema";

export const KorrigertLinjeSchema = z.object({
  korrigerteLinjeIder: z.array(OppdragsLinjeSchema).min(1),
  harValutaer: z.boolean(),
  harSkyldnere: z.boolean(),
  harKravhavere: z.boolean(),
  harEnheter: z.boolean(),
  harGrader: z.boolean(),
  harTekster: z.boolean(),
  harKidliste: z.boolean(),
  harMaksdatoer: z.boolean(),
});
