import { z } from "zod";
import { OppdragSchema, OppdragsListeSchema } from "./schema/OppdragSchema";

export type OppdragsListe = z.infer<typeof OppdragsListeSchema>;

export type Oppdrag = z.infer<typeof OppdragSchema>;
