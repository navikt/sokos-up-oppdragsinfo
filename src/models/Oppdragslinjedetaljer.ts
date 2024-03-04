import { z } from "zod";

export const OppdragslinjedetaljSchema = z.object({
  korrigerteLinjeIder: z.array(z.string()),
  harValutaer: z.boolean(),
  harSkyldnere: z.boolean(),
  harKravhavere: z.boolean(),
  harEnheter: z.boolean(),
  harGrader: z.boolean(),
  harTekster: z.boolean(),
  harKidliste: z.boolean(),
});
export const OppdragslinjedetaljerSchema = z.array(OppdragslinjedetaljSchema);

export type Oppdragslinjedetalj = z.infer<typeof OppdragslinjedetaljSchema>;

export type Oppdragslinjedetaljer = z.infer<typeof OppdragslinjedetaljerSchema>;
