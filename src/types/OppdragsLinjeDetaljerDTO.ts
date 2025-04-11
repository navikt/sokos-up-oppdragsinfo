import { z } from "zod";
import { OppdragsLinjeDetaljerDTOSchema } from "./schema/OppdragsLinjeDetaljerDTOSchema";

export type OppdragsLinjeDetaljerDTO = z.infer<
  typeof OppdragsLinjeDetaljerDTOSchema
>;
