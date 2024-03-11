import { z } from "zod";

export const StatushistorikkStatusSchema = z.object({
  kodeStatus: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const StatushistorikkSchema = z.array(StatushistorikkStatusSchema);

export type StatushistorikkStatus = z.infer<typeof StatushistorikkStatusSchema>;

export type Statushistorikk = z.infer<typeof StatushistorikkSchema>;
