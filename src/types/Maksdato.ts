import type { z } from "zod";
import type {
	MaksdatoListSchema,
	MaksdatoSchema,
} from "./schema/MaksdatoSchema";

export type Maksdato = z.infer<typeof MaksdatoSchema>;

export type MaksdatoList = z.infer<typeof MaksdatoListSchema>;
