import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Ingresa tu usuario"),
  password: z.string().min(1, "Ingresa tu contrasena"),
  captcha: z.string().min(1, "Ingresa el captcha"),
});

export type LoginFormulario = z.infer<typeof loginSchema>;
