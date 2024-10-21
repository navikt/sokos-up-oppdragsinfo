import { z } from "zod";
import {
  OppdragsStatusSchema,
  OppdragsStatuserSchema,
} from "./schema/OppdragsStatusSchema";

export type OppdragsStatus = z.infer<typeof OppdragsStatusSchema>;

export type OppdragsStatuser = z.infer<typeof OppdragsStatuserSchema>;
