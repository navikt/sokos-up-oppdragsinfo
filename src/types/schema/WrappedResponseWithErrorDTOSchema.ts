import { z } from "zod";
import { OppdragsListSchema } from "./OppdragSchema";

export const WrappedResponseWithErrorDTOSchema = z.object({
  data: OppdragsListSchema,
  errorMessage: z.string(),
});
