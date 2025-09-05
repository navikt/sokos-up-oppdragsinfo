import { z } from "zod";

export const GjelderIdSchema = z
  .string({ error: "Må oppgis" })
  .min(1, "Må oppgis")
  .regex(/^[0-9\s.]*$/, "Kun tall")
  .transform((val) => val.trim())
  .refine((val) => [9, 11].includes(val.length), {
    message: "9 eller 11 siffer",
  });
