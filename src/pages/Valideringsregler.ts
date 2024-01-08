import { z, ZodEffects, ZodString } from "zod";

const baretallregel: ZodString = z.string().regex(/^[0-9 ]*$/, "Gjelder-ID kan bare inneholde tall");
const lengderegel: ZodEffects<ZodString, string, string> = z
  .string()
  .refine((s) => [9, 11].includes(s.replace(/\s/, "").length), "Gjelder-ID må ha 9 eller 11 siffer");
export const BareGjelderIDSchema = z.object({
  gjelderID: baretallregel.and(lengderegel),
});
