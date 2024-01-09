import { z, ZodEffects, ZodString } from "zod";

const ikkeblank: ZodString = z.string().min(1, "Gjelder-ID kan ikke være blank");

const baretallregel: ZodString = z.string().regex(/^[0-9\s.]*$/, "Gjelder-ID kan bare inneholde tall");

const lengderegel: ZodEffects<ZodString, string, string> = z
  .string()
  .refine((s) => [9, 11].includes(s.replace(/[\s.]/g, "").length), "Gjelder-ID må ha 9 eller 11 siffer");

export const BareGjelderIDSchema = z.object({
  gjelderID: ikkeblank.pipe(baretallregel).pipe(lengderegel),
});
