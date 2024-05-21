import { ZodEffects, ZodString, z } from "zod";

const ikkeblank: ZodString = z
  .string()
  .min(1, "Søkefeltet kan ikke være blankt");

const baretallregel: ZodString = z
  .string()
  .regex(/^[0-9\s.]*$/, "Dette søkefeltet kan bare inneholde tall");

const lengderegel: ZodEffects<ZodString, string, string> = z
  .string()
  .refine(
    (s) => [9, 11].includes(s.replace(/[\s.]/g, "").length),
    "Må enten gjelde en organisasjon(orgnummer 9 siffer) eller en person (fødselsnummer 11 siffer)",
  );
export const GjelderIdSchema = ikkeblank.pipe(baretallregel).pipe(lengderegel);
export type GjelderId = z.infer<typeof GjelderIdSchema>;
