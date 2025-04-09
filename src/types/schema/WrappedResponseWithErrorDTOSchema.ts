import { z } from "zod";
import { OppdragSchema } from "./OppdragSchema";

export const WrappedResponseWithErrorDTOSchema = z.object({
  data: z.array(OppdragSchema),
  errorMessage: z.string(),
});
