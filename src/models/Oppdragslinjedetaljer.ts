import { z } from "zod";

export const OppdragslinjedetaljSchema = z.object({
  korrigerteLinjeIder: z.array(z.string()).min(1),
  harValutaer: z.boolean(),
  harSkyldnere: z.boolean(),
  harKravhavere: z.boolean(),
  harEnheter: z.boolean(),
  harGrader: z.boolean(),
  harTekster: z.boolean(),
  harKidliste: z.boolean(),
  harMaksdatoer: z.boolean(),
});
export const OppdragslinjedetaljerSchema = z.array(OppdragslinjedetaljSchema).max(1);

export type Oppdragslinjedetalj = z.infer<typeof OppdragslinjedetaljSchema>;

export type Oppdragslinjedetaljer = z.infer<typeof OppdragslinjedetaljerSchema>;
