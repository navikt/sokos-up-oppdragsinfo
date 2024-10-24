import { z } from "zod";
import { EnhetSchema, EnhetsTypeSchema } from "./schema/EnhetsTypeSchema";

export type EnhetsType = z.infer<typeof EnhetsTypeSchema>;
export type Enhet = z.infer<typeof EnhetSchema>;
