import type { z } from "zod";
import type { SokParameterSchema } from "./schema/SokParameterSchema";

export type SokParameter = z.infer<typeof SokParameterSchema>;
