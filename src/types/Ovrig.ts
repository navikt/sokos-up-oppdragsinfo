import type { z } from "zod";
import type { OvrigListSchema, OvrigSchema } from "./schema/OvrigSchema";

export type Ovrig = z.infer<typeof OvrigSchema>;
export type OvrigList = z.infer<typeof OvrigListSchema>;
