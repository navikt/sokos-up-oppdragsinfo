import { z } from "zod";

const _TekstSchema = z.object({
  linjeId: z.string(),
  tekst: z.string(),
});

const _TeksterSchema = z.array(_TekstSchema);

export type Tekst = z.infer<typeof _TekstSchema>;

export type Tekster = z.infer<typeof _TeksterSchema>;
