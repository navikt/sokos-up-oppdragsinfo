import { z } from "zod";
import {
  WrappedResponseWithErrorDTOSchema,
  WrappedSkattekortResponseWithErrorDTOSchema,
} from "./schema/WrappedResponseWithErrorDTOSchema";

export type WrappedResponseWithErrorDTO = z.infer<
  typeof WrappedResponseWithErrorDTOSchema
>;

export type WrappedSkattekortResponseWithErrorDTO = z.infer<
  typeof WrappedSkattekortResponseWithErrorDTOSchema
>;
