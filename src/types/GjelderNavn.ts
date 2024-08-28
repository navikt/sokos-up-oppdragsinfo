import { z } from "zod";

const _GjelderNavnSchema = z.object({
  navn: z.string(),
});

export type GjelderNavn = z.infer<typeof _GjelderNavnSchema>;
