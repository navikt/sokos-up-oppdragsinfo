import { z } from "zod";
import { GjelderIdSchema } from "../../types/schema/GjelderIdSchema";

export type GjelderIdRequest = z.infer<typeof GjelderIdSchema>;
