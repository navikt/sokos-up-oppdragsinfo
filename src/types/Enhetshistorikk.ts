import { z } from "zod";
import { EnhetListSchema } from "./schema/EnhetsTypeSchema";

export type EnhetshistorikkList = z.infer<typeof EnhetListSchema>;
