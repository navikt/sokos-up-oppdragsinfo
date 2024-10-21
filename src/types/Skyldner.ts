import { z } from "zod";
import { SkyldnerSchema, SkyldnereSchema } from "./schema/SkyldnerSchema";

export type Skyldner = z.infer<typeof SkyldnerSchema>;

export type Skyldnere = z.infer<typeof SkyldnereSchema>;
