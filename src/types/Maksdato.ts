import { z } from "zod";
import { MaksdatoListSchema, MaksdatoSchema } from "./schema/MaksdatoSchema";

export type Maksdato = z.infer<typeof MaksdatoSchema>;

export type MaksdatoList = z.infer<typeof MaksdatoListSchema>;
