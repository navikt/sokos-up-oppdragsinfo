import { z } from "zod";

export const FagGruppeSchema = z.object({
  navn: z.string(),
  type: z.string(),
});

export const FagGruppeListSchema = z.array(FagGruppeSchema);
