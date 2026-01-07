import type { z } from "zod";
import type { OppdragsLinjeDetaljerDTOSchema } from "./schema/OppdragsLinjeDetaljerDTOSchema";

export type OppdragsLinjeDetaljerDTO = z.infer<
	typeof OppdragsLinjeDetaljerDTOSchema
>;
