import { z } from "zod";
import {
  OppdragsLinjeListSchema,
  OppdragsLinjeSchema,
} from "./schema/OppdragsLinjeSchema";

export type OppdragsLinje = z.infer<typeof OppdragsLinjeSchema>;

export type OppdragsLinjeList = z.infer<typeof OppdragsLinjeListSchema>;
