import { z } from "zod";
import { OppdragsEnhetDTOSchema } from "./schema/OppdragsEnhetDTOSchema";

export type OppdragsEnhetDTO = z.infer<typeof OppdragsEnhetDTOSchema>;
