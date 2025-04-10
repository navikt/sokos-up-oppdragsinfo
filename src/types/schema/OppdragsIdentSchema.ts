import { z } from "zod";

export const OppdragsIdentSchema = z.object({
  oppdragsId: z.number(),
  linjeId: z.string(),
});
