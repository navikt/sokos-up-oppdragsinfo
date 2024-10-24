import { z } from "zod";

export const OppdragsIdentSchema = z.object({
  oppdragsId: z.string(),
  linjeId: z.string(),
});
