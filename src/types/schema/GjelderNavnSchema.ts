import { z } from "zod";

export const GjelderNavnSchema = z.object({
  navn: z.string(),
});
