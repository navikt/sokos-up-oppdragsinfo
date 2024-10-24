import { z } from "zod";
import {
  OppdragsStatusListSchema,
  OppdragsStatusSchema,
} from "./schema/OppdragsStatusSchema";

export type OppdragsStatus = z.infer<typeof OppdragsStatusSchema>;

export type OppdragsStatusList = z.infer<typeof OppdragsStatusListSchema>;
