import { z } from "zod";

export const accesoSchema = z.object({
  userId: z.string().min(1),
  deviceId: z.string().min(1),
});
