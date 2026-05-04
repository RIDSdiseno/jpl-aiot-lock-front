import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Boton } from "../comunes/Boton";
import { CampoTexto } from "../comunes/CampoTexto";
import { CajaCaptcha } from "./CajaCaptcha";
import { SelectorIdioma } from "./SelectorIdioma";
import { useAutenticacion } from "../../modulos/autenticacion/hooks/useAutenticacion";
import { loginSchema, type LoginFormulario } from "../../modulos/autenticacion/esquemas/autenticacion.schemas";

export function FormularioLogin() {
  const navigate = useNavigate();
  const { loginMutation } = useAutenticacion();
  const [codigoCaptcha, setCodigoCaptcha] = useState("");
  const [errorCaptcha, setErrorCaptcha] = useState("");
  const form = useForm<LoginFormulario>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", captcha: "" },
  });
  const registrarCodigo = useCallback((codigo: string) => setCodigoCaptcha(codigo), []);

  const enviar = form.handleSubmit(async (valores) => {
    if (valores.captcha !== codigoCaptcha) {
      setErrorCaptcha("El captcha no coincide");
      return;
    }
    setErrorCaptcha("");
    await loginMutation.mutateAsync({ email: valores.email, password: valores.password });
    navigate("/app/inicio", { replace: true });
  });

  return (
    <form onSubmit={enviar} className="space-y-4">
      <CampoTexto etiqueta="Email o usuario" placeholder="usuario@empresa.cl" autoComplete="username" {...form.register("email")} error={form.formState.errors.email?.message} />
      <CampoTexto etiqueta="Contraseña" type="password" placeholder="••••••••" autoComplete="current-password" {...form.register("password")} error={form.formState.errors.password?.message} />
      <div className="grid grid-cols-[120px_1fr] gap-3">
        <CajaCaptcha onCodigo={registrarCodigo} />
        <CampoTexto placeholder="Captcha" {...form.register("captcha")} error={form.formState.errors.captcha?.message ?? errorCaptcha} />
      </div>
      <SelectorIdioma />
      {loginMutation.isError ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">No fue posible iniciar sesión. Revisa tus credenciales.</p> : null}
      <Boton className="w-full" disabled={loginMutation.isPending} icono={loginMutation.isPending ? undefined : <Mail className="h-4 w-4" />}>
        {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
      </Boton>
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <Lock className="h-3.5 w-3.5" />
        Acceso seguro mediante token Bearer
      </div>
    </form>
  );
}
