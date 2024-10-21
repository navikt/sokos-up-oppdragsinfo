import { z } from "zod";
import { EnhetshistorikkSchema } from "./schema/EnhetshistorikkSchema";

export type Enhetshistorikk = z.infer<typeof EnhetshistorikkSchema>;
