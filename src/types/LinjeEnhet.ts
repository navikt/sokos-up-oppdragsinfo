import { z } from "zod";
import {
  LinjeEnhetListSchema,
  LinjeEnhetSchema,
} from "./schema/LinjeEnhetSchema";

export type LinjeEnhet = z.infer<typeof LinjeEnhetSchema>;

export type LinjeenhetList = z.infer<typeof LinjeEnhetListSchema>;
