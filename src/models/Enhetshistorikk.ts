import { z } from "zod";
import { EnhetSchema } from "./Enhet";

export const EnhetshistorikkSchema = z.array(EnhetSchema);

export type Enhetshistorikk = z.infer<typeof EnhetshistorikkSchema>;
