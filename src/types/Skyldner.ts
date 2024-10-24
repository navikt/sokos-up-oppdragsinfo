import { z } from "zod";
import { SkyldnerListSchema, SkyldnerSchema } from "./schema/SkyldnerSchema";

export type Skyldner = z.infer<typeof SkyldnerSchema>;

export type SkyldnerList = z.infer<typeof SkyldnerListSchema>;
