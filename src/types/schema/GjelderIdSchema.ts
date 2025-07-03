import { z } from "zod";

export const GjelderIdSchema = z
  .string()
  .optional()
  .superRefine((val, ctx) => {
    if (!val || val.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Må oppgis",
      });
    } else if (!/^[0-9\s.]*$/.test(val.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kun tall",
      });
    } else {
      const length = val.trim().length;
      if (![9, 11].includes(length)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "9 eller 11 siffer",
        });
      }
    }
  });
