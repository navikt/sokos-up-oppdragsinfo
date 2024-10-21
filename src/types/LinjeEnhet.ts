import { z } from "zod";
import {
  LinjeEnhetSchema,
  LinjeEnheterSchema,
} from "./schema/LinjeEnhetSchema";

export type LinjeEnhet = z.infer<typeof LinjeEnhetSchema>;

export type Linjeenheter = z.infer<typeof LinjeEnheterSchema>;
