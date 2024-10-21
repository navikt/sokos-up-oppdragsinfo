import { z } from "zod";
import {
  OmposteringSchema,
  OmposteringerSchema,
} from "./schema/OmposteringSchema";

export type Ompostering = z.infer<typeof OmposteringSchema>;
export type Omposteringer = z.infer<typeof OmposteringerSchema>;
