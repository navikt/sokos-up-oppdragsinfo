import { z, ZodEffects, ZodString } from "zod";

const ikkeblank: ZodString = z.string().min(1, "Søkefeltet kan ikke være blankt");

const baretallregel: ZodString = z.string().regex(/^[0-9\s.]*$/, "Dette søkefeltet kan bare inneholde tall");

const lengderegel: ZodEffects<ZodString, string, string> = z
  .string()
  .refine(
    (s) => [9, 11].includes(s.replace(/[\s.]/g, "").length),
    "Må enten gjelde organisasjon(9 sifre) eller en person (Fødselsnummer 11 siffer)",
  );

export const BareGjelderIDSchema = z.object({
  gjelderID: ikkeblank.pipe(baretallregel).pipe(lengderegel),
});
