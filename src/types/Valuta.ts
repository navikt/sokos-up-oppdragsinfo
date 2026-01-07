import type { z } from "zod";
import type { ValutaListSchema, ValutaSchema } from "./schema/ValutaSchema";

export type Valuta = z.infer<typeof ValutaSchema>;

export type ValutaList = z.infer<typeof ValutaListSchema>;
