import { z } from "zod";
import { GjelderIdSchema } from "./GjelderId";

export const TrefflisteSearchParametersSchema = z.object({
  gjelderID: GjelderIdSchema,
});

export type TrefflisteSearchParameters = z.infer<
  typeof TrefflisteSearchParametersSchema
>;
