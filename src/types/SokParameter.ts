import { z } from "zod";
import { SokParameterSchema } from "./schema/SokParameterSchema";

export type SokParameter = z.infer<typeof SokParameterSchema>;
