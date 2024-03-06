import { z } from "zod";

export const FaggruppeSchema = z.object({
  navn: z.string(),
  type: z.string(),
});

export type Faggruppe = z.infer<typeof FaggruppeSchema>;
