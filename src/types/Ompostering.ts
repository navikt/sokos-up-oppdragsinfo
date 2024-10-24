import { z } from "zod";
import {
  OmposteringListSchema,
  OmposteringSchema,
} from "./schema/OmposteringSchema";

export type Ompostering = z.infer<typeof OmposteringSchema>;
export type OmposteringList = z.infer<typeof OmposteringListSchema>;
