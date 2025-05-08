import { z } from "zod";

export const GjelderIdSchema = z
  .string()
  .optional()
  .superRefine((val, ctx) => {
    if (!val || val.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Søkefeltet kan ikke være blankt",
      });
    } else if (!/^[0-9\s.]*$/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Dette søkefeltet kan bare inneholde tall",
      });
    } else {
      const length = val.length;
      if (![9, 11].includes(length)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Må enten gjelde en organisasjon (orgnummer 9 siffer) eller en person (fødselsnummer 11 siffer)",
        });
      }
    }
  });
