import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LogIn, User } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAutenticacion } from "../../modulos/autenticacion/hooks/useAutenticacion";
import {
  loginSchema,
  type LoginFormulario,
} from "../../modulos/autenticacion/esquemas/autenticacion.schemas";
import { CajaCaptcha } from "./CajaCaptcha";
import { SelectorIdioma } from "./SelectorIdioma";

// ─── Estilos compartidos de input ────────────────────────────────────────────
const inputBase =
  "w-full rounded-lg border border-slate-700/55 bg-slate-900/60 py-2.5 pl-10 pr-4 " +
  "font-mono text-sm text-slate-200 outline-none transition-all " +
  "placeholder:text-slate-600 " +
  "focus:border-cyan-500/60 focus:bg-slate-900/80 focus:ring-1 focus:ring-cyan-500/25";

export function FormularioLogin() {
  // ── Auth logic — sin cambios ─────────────────────────────────────────────
  const navigate = useNavigate();
  const { loginMutation } = useAutenticacion();
  const [codigoCaptcha, setCodigoCaptcha] = useState("");
  const [errorCaptcha, setErrorCaptcha] = useState("");

  const form = useForm<LoginFormulario>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", captcha: "" },
  });

  const registrarCodigo = useCallback(
    (codigo: string) => setCodigoCaptcha(codigo),
    [],
  );

  const enviar = form.handleSubmit(async (valores) => {
    if (valores.captcha !== codigoCaptcha) {
      setErrorCaptcha("El captcha no coincide");
      return;
    }
    setErrorCaptcha("");
    await loginMutation.mutateAsync({
      username: valores.email,
      password: valores.password,
    });
    navigate("/app/inicio", { replace: true });
  });
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={enviar} className="space-y-5">
      {/* Usuario */}
      <label className="block">
        <span className="mb-2 block font-mono text-xs tracking-[0.2em] uppercase text-slate-400">
          Usuario
        </span>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500/55" />
          <input
            placeholder="Ingrese su nombre de usuario"
            autoComplete="username"
            {...form.register("email")}
            className={inputBase}
          />
        </div>
        {form.formState.errors.email?.message && (
          <span className="mt-1 block font-mono text-xs text-red-400">
            {form.formState.errors.email.message}
          </span>
        )}
      </label>

      {/* Contraseña */}
      <label className="block">
        <span className="mb-2 block font-mono text-xs tracking-[0.2em] uppercase text-slate-400">
          Contraseña
        </span>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500/55" />
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            autoComplete="current-password"
            {...form.register("password")}
            className={inputBase}
          />
        </div>
        {form.formState.errors.password?.message && (
          <span className="mt-1 block font-mono text-xs text-red-400">
            {form.formState.errors.password.message}
          </span>
        )}
      </label>

      {/* Captcha */}
      <div className="grid grid-cols-[110px_1fr] gap-3">
        <CajaCaptcha onCodigo={registrarCodigo} />
        <label className="block">
          <input
            placeholder="Captcha"
            {...form.register("captcha")}
            className={
              "w-full rounded-lg border border-slate-700/55 bg-slate-900/60 px-3 py-2.5 " +
              "font-mono text-sm text-slate-200 outline-none transition-all " +
              "placeholder:text-slate-600 " +
              "focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/25"
            }
          />
          {(form.formState.errors.captcha?.message ?? errorCaptcha) && (
            <span className="mt-1 block font-mono text-xs text-red-400">
              {form.formState.errors.captcha?.message ?? errorCaptcha}
            </span>
          )}
        </label>
      </div>

      {/* Selector de idioma */}
      <SelectorIdioma />

      {/* Error de autenticación */}
      {loginMutation.isError && (
        <div
          className="rounded-lg px-4 py-2.5 font-mono text-xs text-red-400"
          style={{
            background: "rgba(127,29,29,0.18)",
            border: "1px solid rgba(239,68,68,0.25)",
          }}
        >
          ⚠ Credenciales incorrectas o usuario inactivo.
        </div>
      )}

      {/* Botón submit */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="group relative w-full overflow-hidden rounded-lg py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-all disabled:cursor-not-allowed disabled:opacity-55"
        style={{
          background: loginMutation.isPending
            ? "linear-gradient(135deg, #164e63, #1e3a5f)"
            : "linear-gradient(135deg, #0891b2 0%, #2563eb 100%)",
          boxShadow: loginMutation.isPending
            ? "none"
            : "0 0 22px rgba(8,145,178,0.38)",
        }}
      >
        {/* Shimmer on hover */}
        {!loginMutation.isPending && (
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loginMutation.isPending ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Iniciando sesión...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Ingresar
            </>
          )}
        </span>
      </button>

      {/* Indicador de sesión segura */}
      <div className="flex items-center justify-center gap-2 font-mono text-xs text-slate-600">
        <Lock className="h-3 w-3" />
        Acceso seguro mediante token Bearer
      </div>
    </form>
  );
}
