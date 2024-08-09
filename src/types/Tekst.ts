import { z } from "zod";

const TekstSchema = z.object({
  linjeId: z.string(),
  tekst: z.string()
});

const TeksterSchema = z.array(TekstSchema);

export type Tekst = z.infer<typeof TekstSchema>;

export type Tekster = z.infer<typeof TeksterSchema>;
