import { z } from "zod";
import { OppdragsListSchema } from "./OppdragSchema";

export const WrappedResponseWithErrorDTOSchema = z.object({
	data: OppdragsListSchema,
	errorMessage: z.string(),
});

export const WrappedSkattekortResponseWithErrorDTOSchema = z.object({
	data: z.object({ status: z.string() }),
	errorMessage: z.string().nullable(),
});
