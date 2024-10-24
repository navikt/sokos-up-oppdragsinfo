import { z } from "zod";

export const TekstSchema = z.object({
  linjeId: z.string(),
  tekst: z.string(),
});

export const TekstListSchema = z.array(TekstSchema);
