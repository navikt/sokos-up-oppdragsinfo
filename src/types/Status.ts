import { z } from "zod";
import { StatusSchema, StatuserSchema } from "./schema/StatusSchema";

export type Status = z.infer<typeof StatusSchema>;

export type Statuser = z.infer<typeof StatuserSchema>;
