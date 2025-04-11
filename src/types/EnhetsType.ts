import { z } from "zod";
import {
  OppdragsEnhetSchema,
  OppdragsEnhetTypeSchema,
} from "./schema/OppdragsEnhet";

export type EnhetsType = z.infer<typeof OppdragsEnhetTypeSchema>;
export type Enhet = z.infer<typeof OppdragsEnhetSchema>;
