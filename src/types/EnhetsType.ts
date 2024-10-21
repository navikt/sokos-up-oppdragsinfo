import { z } from "zod";
import { EnhetSchema, EnhetsTypeSchema } from "./schema/EnhetsTypeSchema";

export type EnhetsTypeEnum = z.infer<typeof EnhetsTypeSchema>;
export type EnhetsType = z.infer<typeof EnhetSchema>;
