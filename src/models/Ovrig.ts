import { z } from "zod";

export const OvrigSchema = z.object({
  linjeId: z.string(),
  vedtaksId: z.string(),
  henvisning: z.string(),
  soknadsType: z.string(),
});

export const OvrigeSchema = z.array(OvrigSchema);

export type Ovrig = z.infer<typeof OvrigSchema>;

export type Ovrige = z.infer<typeof OvrigeSchema>;
