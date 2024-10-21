import { z } from "zod";
import { ValutaSchema, ValutaerSchema } from "./schema/ValutaSchema";

export type Valuta = z.infer<typeof ValutaSchema>;

export type Valutaer = z.infer<typeof ValutaerSchema>;
