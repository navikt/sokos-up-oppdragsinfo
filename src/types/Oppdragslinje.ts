import { z } from "zod";
import {
  OppdragsLinjeSchema,
  OppdragsLinjerSchema,
} from "./schema/OppdragsLinjeSchema";

export type OppdragsLinje = z.infer<typeof OppdragsLinjeSchema>;

export type OppdragsLinjer = z.infer<typeof OppdragsLinjerSchema>;
