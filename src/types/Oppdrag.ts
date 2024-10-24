import { z } from "zod";
import { OppdragSchema, OppdragsListSchema } from "./schema/OppdragSchema";

export type OppdragsList = z.infer<typeof OppdragsListSchema>;

export type Oppdrag = z.infer<typeof OppdragSchema>;
