import { z } from "zod";

export const dispositivoSchema = z.object({
  name: z.string().min(2, "Ingresa un nombre"),
  internalCode: z.string().min(2, "Ingresa un código interno"),
  type: z.string().min(1, "Selecciona un tipo"),
  status: z.string().min(1, "Selecciona un estado"),
});
