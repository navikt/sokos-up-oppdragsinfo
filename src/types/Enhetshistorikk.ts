import { z } from "zod";
import { EnhetListSchema } from "./schema/EnhetsTypeSchema";

export type Enhetshistorikk = z.infer<typeof EnhetListSchema>;
