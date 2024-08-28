import { z } from "zod";

const _OvrigSchema = z.object({
  linjeId: z.string(),
  vedtaksId: z.string(),
  henvisning: z.string(),
  soknadsType: z.string(),
});

const _OvrigeSchema = z.array(_OvrigSchema);

export type Ovrig = z.infer<typeof _OvrigSchema>;
export type Ovrige = z.infer<typeof _OvrigeSchema>;
