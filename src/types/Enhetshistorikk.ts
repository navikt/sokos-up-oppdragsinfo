import { z } from "zod";
import { EnhetstypeSchema } from "./Enhetstype";

export const EnhetshistorikkSchema = z.array(EnhetstypeSchema);

export type Enhetshistorikk = z.infer<typeof EnhetshistorikkSchema>;
