import { z } from "zod";
import { WrappedResponseWithErrorDTOSchema } from "./schema/WrappedResponseWithErrorDTOSchema";

export type WrappedResponseWithErrorDTO = z.infer<
  typeof WrappedResponseWithErrorDTOSchema
>;
