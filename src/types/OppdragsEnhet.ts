import { z } from "zod";
import { OppdragsEnhetSchema } from "./schema/OppdragsEnhetSchema";

export type OppdragsEnhet = z.infer<typeof OppdragsEnhetSchema>;
