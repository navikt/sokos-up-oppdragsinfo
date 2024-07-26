import { z } from "zod";

const GjelderNavnSchema = z.object({
  navn: z.string()
});

export type GjelderNavn = z.infer<typeof GjelderNavnSchema>