import { z } from "zod";
import { OppdragsEnhetListSchema } from "./schema/OppdragsEnhet";

export type OppdragsEnhetList = z.infer<typeof OppdragsEnhetListSchema>;
