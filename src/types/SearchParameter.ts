import { z } from "zod";
import { GjelderIdSchema } from "./GjelderId";

export const SearchParameterSchema = z.object({
  gjelderId: GjelderIdSchema,
  faggruppeType: z.string().optional()
});

export type SearchParameter = z.infer<
  typeof SearchParameterSchema
>;
