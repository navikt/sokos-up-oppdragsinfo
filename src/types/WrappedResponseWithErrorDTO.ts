import type { z } from "zod";
import type {
	WrappedResponseWithErrorDTOSchema,
	WrappedSkattekortResponseWithErrorDTOSchema,
} from "./schema/WrappedResponseWithErrorDTOSchema";

export type WrappedResponseWithErrorDTO = z.infer<
	typeof WrappedResponseWithErrorDTOSchema
>;

export type WrappedSkattekortResponseWithErrorDTO = z.infer<
	typeof WrappedSkattekortResponseWithErrorDTOSchema
>;
